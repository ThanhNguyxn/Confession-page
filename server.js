const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./confessions.db', (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

// Initialize database schema
function initDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS confessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tracking_code TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL,
        content TEXT NOT NULL,
        photo_url TEXT,
        note TEXT,
        status TEXT DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Database schema initialized');
        }
    });
}

// Generate unique tracking code
function generateTrackingCode() {
    return crypto.randomBytes(4).toString('hex').toUpperCase();
}

// API Routes

// Submit new confession
app.post('/api/confessions', (req, res) => {
    const { category, content, photo, note } = req.body;
    
    // Validation
    if (!category || !content) {
        return res.status(400).json({ 
            success: false, 
            message: 'Category and content are required' 
        });
    }

    const trackingCode = generateTrackingCode();
    
    db.run(
        `INSERT INTO confessions (tracking_code, category, content, photo_url, note) 
         VALUES (?, ?, ?, ?, ?)`,
        [trackingCode, category, content, photo || null, note || null],
        function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to submit confession' 
                });
            }
            
            res.json({
                success: true,
                trackingCode: trackingCode,
                message: 'Confession submitted successfully!',
                id: this.lastID
            });
        }
    );
});

// Track confession by code
app.get('/api/confessions/:code', (req, res) => {
    const { code } = req.params;
    
    db.get(
        `SELECT id, tracking_code, category, content, status, created_at, updated_at 
         FROM confessions WHERE tracking_code = ?`,
        [code.toUpperCase()],
        (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Database error' 
                });
            }
            
            if (!row) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Confession not found' 
                });
            }
            
            res.json({
                success: true,
                confession: row
            });
        }
    );
});

// Get recent confessions (only Approved status)
app.get('/api/confessions', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    
    db.all(
        `SELECT tracking_code, category, SUBSTR(content, 1, 200) as content, created_at 
         FROM confessions 
         WHERE status = 'Approved' 
         ORDER BY created_at DESC 
         LIMIT ?`,
        [limit],
        (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Database error' 
                });
            }
            
            res.json({
                success: true,
                confessions: rows
            });
        }
    );
});

// Update confession status (admin)
app.put('/api/confessions/:code/status', (req, res) => {
    const { code } = req.params;
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({
            success: false, 
            message: 'Invalid status' 
        });
    }
    
    db.run(
        `UPDATE confessions 
         SET status = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE tracking_code = ?`,
        [status, code.toUpperCase()],
        function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to update status' 
                });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Confession not found' 
                });
            }
            
            res.json({
                success: true,
                message: 'Status updated successfully'
            });
        }
    );
});

// Get statistics
app.get('/api/stats', (req, res) => {
    db.all(
        `SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) as approved,
            SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
            SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
         FROM confessions`,
        (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Database error' 
                });
            }
            
            const stats = rows[0];
            res.json({
                success: true,
                stats: {
                    total: stats.total || 0,
                    approved: stats.approved || 0,
                    pending: stats.pending || 0,
                    rejected: stats.rejected || 0,
                    acceptanceRate: stats.total > 0
                        ? ((stats.approved / stats.total) * 100).toFixed(1)
                        : 0
                }
            });
        }
    );
});

// Admin: Get all confessions
app.get('/api/admin/confessions', (req, res) => {
    db.all(
        `SELECT id, tracking_code, category, content, photo_url, note, status, created_at, updated_at 
         FROM confessions 
         ORDER BY created_at DESC`,
        (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Database error'
                });
            }

            res.json({
                success: true,
                confessions: rows
            });
        }
    );
});

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/track', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'confession.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Backend API endpoints:');
    console.log('  POST   /api/confessions       - Submit confession');
    console.log('  GET    /api/confessions/:code - Track confession');
    console.log('  GET    /api/confessions       - Get recent confessions');
    console.log('  GET    /api/stats             - Get statistics');
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
});

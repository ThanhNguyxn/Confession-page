# Anonymous Confessions - Full-Stack Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Submit Confession: http://localhost:3000
- Track Confession: http://localhost:3000/track

## 📁 Project Structure

```
cfs-page/
├── index.html              # Main page with submission form
├── confession.html         # Tracking page
├── server.js              # Node.js + Express backend
├── package.json           # Dependencies
├── confessions.db         # SQLite database (auto-created)
├── assets/
│   ├── js/
│   │   ├── app.js        # Frontend API integration
│   │   └── scripts.js    # UI scripts
│   ├── css/              # Stylesheets
│   └── images/           # Images
└── README.md
```

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file:
```
PORT=3000
NODE_ENV=production
```

### Database
The SQLite database (`confessions.db`) is automatically created on first run.

**Schema:**
```sql
CREATE TABLE confessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tracking_code TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    photo_url TEXT,
    note TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## 📡 API Endpoints

### Submit Confession
```http
POST /api/confessions
Content-Type: application/json

{
  "category": "Confession",
  "content": "Your confession text...",
  "photo": "https://example.com/photo.jpg",  // optional
  "note": "Private note to admin"            // optional
}
```

**Response:**
```json
{
  "success": true,
  "trackingCode": "A1B2C3D4",
  "message": "Confession submitted successfully!"
}
```

### Track Confession
```http
GET /api/confessions/:code

Example: GET /api/confessions/A1B2C3D4
```

**Response:**
```json
{
  "success": true,
  "confession": {
    "id": 1,
    "tracking_code": "A1B2C3D4",
    "category": "Confession",
    "content": "...",
    "status": "Pending",
    "created_at": "2024-01-01 12:00:00"
  }
}
```

### Get Recent Confessions
```http
GET /api/confessions?limit=10
```

### Update Status (Admin)
```http
PUT /api/confessions/:code/status
Content-Type: application/json

{
  "status": "Posted"  // or "Pending", "Rejected"
}
```

### Get Statistics
```http
GET /api/stats
```

## 🎨 Frontend Features

### Confession Submission Form
- Category selection
- Content textarea (10-5000 characters)
- Optional photo URL
- Optional private note
- Real-time validation
- Success/error notifications

### Tracking System
- Search by tracking code
- Display confession details
- Show current status
- Formatted dates

### Recent Confessions Display
- Shows latest Posted confessions
- Auto-loads on homepage
- Clean card design
- Responsive layout

## 🛡️ Security Features

- Input validation
- SQL injection prevention (parameterized queries)
- XSS protection
- CORS enabled
- Unique tracking codes

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px-1199px)
- Mobile (320px-767px)

## 🚀 Deployment Options

### Option 1: Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
git push heroku main
```

### Option 2: DigitalOcean
```bash
# Create a Droplet
# Install Node.js
# Clone repository
npm install
npm start
```

### Option 3: Vercel/Netlify
- Deploy static files (index.html, assets)
- Use serverless functions for backend
- Or use separate backend hosting

### Option 4: Docker
```dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t confession-app .
docker run -p 3000:3000 confession-app
```

## 🔍 Testing

### Test Submission
1. Open http://localhost:3000
2. Fill out the form
3. Click "Submit"
4. Save the tracking code

### Test Tracking
1. Open http://localhost:3000/track
2. Enter your tracking code
3. View confession details

### Test API
```bash
# Submit
curl -X POST http://localhost:3000/api/confessions \
  -H "Content-Type: application/json" \
  -d '{"category":"Test","content":"This is a test confession"}'

# Track
curl http://localhost:3000/api/confessions/YOUR_CODE
```

## 📊 Monitoring

### View Database
```bash
sqlite3 confessions.db
.tables
SELECT * FROM confessions;
```

### Check Logs
Server logs are printed to console. For production, consider:
- Winston (logging library)
- PM2 (process manager)
- Log files

## 🔄 Updates

### Adding Features
1. Backend: Edit `server.js`
2. Frontend: Edit `assets/js/app.js`
3. UI: Edit HTML/CSS files

### Database Migration
```bash
# Backup
cp confessions.db confessions.backup.db

# Restore
cp confessions.backup.db confessions.db
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in server.js
const PORT = process.env.PORT || 3001;
```

### Database Locked
- Close other connections
- Restart server

### CORS Errors
- Check CORS configuration in server.js
- Ensure frontend and backend URLs match

## 📞 Support

For issues:
1. Check console logs
2. Verify database file exists
3. Test API endpoints directly
4. Check network requests in browser DevTools

## 📄 License

MIT License - Feel free to use and modify!

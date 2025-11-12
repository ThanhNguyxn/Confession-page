# 💬 Anonymous Confessions Platform

> A modern, full-stack confession submission and tracking system built with Node.js, Express, and SQLite.

[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey.svg)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📖 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Frontend
- ✅ **Anonymous Submission** - No login required
- ✅ **Real-time Tracking** - Track confession status with unique code
- ✅ **Multiple Categories** - Confession, Lost Love, Study, etc.
- ✅ **Photo Support** - Optional image URL attachment
- ✅ **Modern UI/UX** - Clean, responsive Bootstrap design
- ✅ **Live Notifications** - Success/error toast messages
- ✅ **Mobile-Friendly** - Works on all devices

### Backend
- ✅ **RESTful API** - Clean Express.js endpoints
- ✅ **SQLite Database** - Zero configuration, file-based
- ✅ **Unique Tracking Codes** - 8-character alphanumeric codes
- ✅ **Status Management** - Pending → Posted → Rejected workflow
- ✅ **CORS Enabled** - Cross-origin requests supported
- ✅ **Input Validation** - Server-side security checks
- ✅ **Statistics API** - Real-time analytics

## 🎬 Demo

### Submit a Confession
```bash
curl -X POST http://localhost:3000/api/confessions \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Confession",
    "content": "My anonymous secret...",
    "photo": "https://example.com/image.jpg",
    "note": "Private note to moderator"
  }'
```

**Response:**
```json
{
  "success": true,
  "trackingCode": "A7F3B9E2",
  "message": "Confession submitted successfully!",
  "id": 1
}
```

### Track Status
```bash
curl http://localhost:3000/api/confessions/A7F3B9E2
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14 or higher → [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** (optional) → [Download](https://git-scm.com/)

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/anonymous-confessions.git
   cd anonymous-confessions
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Server**
   ```bash
   npm start
   ```

4. **Open Browser**
   - Main page: http://localhost:3000
   - Tracking: http://localhost:3000/track

### Development Mode
```bash
npm run dev
```
Auto-reloads on file changes using nodemon.

## 📁 Project Structure

```
anonymous-confessions/
├── public/                  # Frontend files
│   ├── index.html          # Main submission page
│   ├── confession.html     # Tracking page
│   └── assets/             # Static assets
│       ├── css/           # Stylesheets
│       ├── js/            # Frontend scripts
│       │   ├── app.js    # API integration
│       │   └── scripts.js # UI interactions
│       └── images/        # Images & icons
├── server.js               # Express backend
├── package.json            # Dependencies
├── confessions.db          # SQLite database (auto-created)
├── docs/                   # Documentation
│   ├── README.md          # This file
│   ├── API.md             # API documentation
│   └── DEPLOYMENT.md      # Deployment guide
├── .gitignore
└── README.md
```

## 📡 API Documentation

### Endpoints Overview

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/confessions` | Submit confession | No |
| `GET` | `/api/confessions/:code` | Get confession by code | No |
| `GET` | `/api/confessions` | List recent confessions | No |
| `PUT` | `/api/confessions/:code/status` | Update status | Admin* |
| `GET` | `/api/stats` | Get statistics | No |

*Admin authentication not implemented - add your own

### POST `/api/confessions`

**Submit a new confession**

**Request:**
```json
{
  "category": "Confession",        // required
  "content": "Your message...",    // required, 10-5000 chars
  "photo": "https://...",          // optional
  "note": "Private note..."        // optional
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "trackingCode": "A7F3B9E2",
  "message": "Confession submitted successfully!",
  "id": 1
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Category and content are required"
}
```

### GET `/api/confessions/:code`

**Track confession by code**

**Response (200 OK):**
```json
{
  "success": true,
  "confession": {
    "id": 1,
    "tracking_code": "A7F3B9E2",
    "category": "Confession",
    "content": "...",
    "status": "Pending",
    "created_at": "2024-01-15 10:30:00",
    "updated_at": "2024-01-15 10:30:00"
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Confession not found"
}
```

### GET `/api/confessions?limit=10`

**Get recent posted confessions**

**Query Parameters:**
- `limit` (optional) - Number of results (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "confessions": [
    {
      "tracking_code": "A7F3B9E2",
      "category": "Confession",
      "content": "First 200 characters...",
      "created_at": "2024-01-15 10:30:00"
    }
  ]
}
```

### PUT `/api/confessions/:code/status`

**Update confession status (Admin)**

**Request:**
```json
{
  "status": "Posted"  // "Pending", "Posted", or "Rejected"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Status updated successfully"
}
```

### GET `/api/stats`

**Get platform statistics**

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 150,
    "posted": 120,
    "pending": 30,
    "acceptanceRate": "80.0"
  }
}
```

## ⚙️ Configuration

### Environment Variables

Create `.env` file (optional):
```env
PORT=3000
NODE_ENV=production
```

### Database Schema

SQLite database (`confessions.db`) auto-created on first run:

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
);
```

**Statuses:**
- `Pending` - Awaiting moderation (default)
- `Posted` - Approved and visible
- `Rejected` - Declined by moderator

## 🚀 Deployment

### Option 1: Heroku

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Deploy
git push heroku main
heroku open
```

### Option 2: DigitalOcean

```bash
# SSH into droplet
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Clone and run
git clone your-repo
cd anonymous-confessions
npm install
npm start
```

### Option 3: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t confessions-app .
docker run -p 3000:3000 confessions-app
```

### Option 4: PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start server.js --name confessions
pm2 save
pm2 startup
```

See [docs/DEPLOYMENT.md](DEPLOYMENT.md) for detailed guides.

## 🛠️ Development

### Run in Dev Mode
```bash
npm run dev
```

### Database Management
```bash
# View database
sqlite3 confessions.db

# SQL commands
.tables
SELECT * FROM confessions;
.quit

# Backup
cp confessions.db backup.db
```

### Testing APIs
```bash
# Submit confession
curl -X POST http://localhost:3000/api/confessions \
  -H "Content-Type: application/json" \
  -d '{"category":"Test","content":"Testing API..."}'

# Track confession
curl http://localhost:3000/api/confessions/YOUR_CODE

# Get stats
curl http://localhost:3000/api/stats
```

## 🔒 Security Recommendations

For production deployment:

1. **Add Authentication** for admin endpoints
2. **Rate Limiting** to prevent spam
3. **Input Sanitization** (already basic validation exists)
4. **HTTPS** with SSL certificates
5. **Environment Variables** for sensitive config
6. **CORS Configuration** - restrict allowed origins
7. **Content Moderation** system

Example rate limiting:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change port in server.js or use environment variable
PORT=3001 npm start
```

**Database locked:**
- Close other SQLite connections
- Restart server

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**CORS errors:**
- Check CORS configuration in `server.js`
- Ensure frontend/backend URLs match

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Roadmap

- [ ] Admin dashboard for moderation
- [ ] User authentication (optional)
- [ ] Image upload support
- [ ] Email notifications
- [ ] Search & filter confessions
- [ ] Categories management
- [ ] Report inappropriate content
- [ ] Analytics dashboard

## 🙏 Acknowledgments

- Bootstrap for UI framework
- Express.js for backend
- SQLite for database
- Node.js community

## 📞 Support

- **Documentation:** [docs/](docs/)
- **Issues:** [GitHub Issues](https://github.com/yourusername/repo/issues)
- **Email:** support@example.com

---

Made with ❤️ by [Your Name]

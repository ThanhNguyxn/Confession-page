# 💬 Anonymous Confessions Platform

> A modern, full-stack anonymous confession submission and tracking system built with Node.js, Express, and SQLite. Features real-time status tracking, multiple categories, and a beautiful responsive UI.

[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey.svg)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

![Platform Preview](https://via.placeholder.com/800x400/05de7d/ffffff?text=Anonymous+Confessions+Platform)

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Development](#-development)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎭 For Users
- **🔒 100% Anonymous** - No registration, login, or personal information required
- **🎟️ Unique Tracking Code** - Each confession gets a unique code to track status
- **📁 Multiple Categories** - Confession, Lost Love, Study, Work, Family, and more
- **🖼️ Photo Support** - Optional image URL attachment
- **📱 Mobile-Friendly** - Fully responsive design for all devices
- **⚡ Real-time Status** - Track your confession: Pending → Approved → Posted
- **💬 Private Notes** - Add additional context visible only to admins

### 🛠️ Technical Features
- **Backend:** Node.js + Express.js (RESTful API)
- **Database:** SQLite (zero-configuration, file-based)
- **Frontend:** Vanilla JavaScript (no framework dependencies)
- **UI Framework:** Bootstrap 5 + Custom CSS
- **API:** RESTful endpoints with JSON responses
- **Security:** Input validation, CORS support, SQL injection prevention
- **Performance:** Lightweight and fast (< 100ms response time)

### 🎨 Design Features
- Modern gradient buttons with hover effects
- Card-based layout with smooth animations
- Color-coded status badges
- Loading states and spinners
- Toast notifications
- Responsive grid layouts
- Accessibility support (WCAG 2.1)

---

## 🚀 Quick Start

Get up and running in 3 simple steps:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/anonymous-confessions.git
cd anonymous-confessions

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

**That's it!** 🎉 Open your browser and navigate to:
```
http://localhost:3000
```

The SQLite database will be created automatically on first run.

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v14.0 or higher ([Download](https://nodejs.org/))
- **npm** v6.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/anonymous-confessions.git
cd anonymous-confessions
```

#### 2. Install Dependencies
```bash
npm install
```

This will install:
- `express` - Web framework
- `sqlite3` - Database driver
- `cors` - Cross-origin resource sharing
- `nodemon` - Development auto-reload (dev dependency)

#### 3. Environment Setup (Optional)
Create a `.env` file for custom configuration:
```bash
PORT=3000
NODE_ENV=development
DATABASE_PATH=./confessions.db
```

#### 4. Initialize Database (Automatic)
The database schema is created automatically on first run. No manual setup needed!

#### 5. Start the Server

**Production Mode:**
```bash
npm start
```

**Development Mode (with auto-reload):**
```bash
npm run dev
```

#### 6. Verify Installation
Open your browser and visit:
- Main page: `http://localhost:3000`
- Tracking page: `http://localhost:3000/confession.html`
- API health: `http://localhost:3000/api/stats`

---

## 📖 Usage Guide

### For End Users

#### Submitting a Confession

1. **Navigate to the main page** (`http://localhost:3000`)
2. **Fill out the form:**
   - Select a category (required)
   - Write your confession (minimum 10 characters)
   - Add photo URL (optional)
   - Add private notes (optional)
3. **Click "Submit Confession"**
4. **Save your tracking code!** You'll receive a unique code like `A1B2C3D4`

#### Tracking Your Confession

1. **Go to the tracking page** (`/confession.html`)
2. **Enter your tracking code**
3. **View status:**
   - 🟡 **Pending** - Under review
   - 🟢 **Approved** - Will be posted soon
   - 🔵 **Posted** - Live on the platform
   - 🔴 **Rejected** - Did not meet guidelines

### For Developers

#### Available Categories
- Confession
- Lost Love
- Study
- Work
- Family
- Friendship
- Secret
- Advice
- Other

#### Status Workflow
```
Submit → Pending → Approved → Posted
                 ↓
              Rejected
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Submit a Confession
```http
POST /api/confessions
```

**Request Body:**
```json
{
  "category": "Confession",
  "content": "Your confession text here...",
  "photo": "https://example.com/photo.jpg",
  "note": "Additional context for admin"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Confession submitted successfully",
  "trackingCode": "A1B2C3D4",
  "confession": {
    "id": 123,
    "tracking_code": "A1B2C3D4",
    "category": "Confession",
    "status": "Pending",
    "created_at": "2025-11-12T10:30:00.000Z"
  }
}
```

#### 2. Track a Confession
```http
GET /api/confessions/:code
```

**Example:**
```bash
curl http://localhost:3000/api/confessions/A1B2C3D4
```

**Response (200 OK):**
```json
{
  "success": true,
  "confession": {
    "id": 123,
    "tracking_code": "A1B2C3D4",
    "category": "Confession",
    "content": "Your confession...",
    "status": "Pending",
    "created_at": "2025-11-12T10:30:00.000Z",
    "updated_at": "2025-11-12T10:30:00.000Z"
  }
}
```

#### 3. List Recent Confessions
```http
GET /api/confessions?limit=10&offset=0
```

**Query Parameters:**
- `limit` (optional): Number of results (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `status` (optional): Filter by status (Pending, Approved, Posted, Rejected)

**Response (200 OK):**
```json
{
  "success": true,
  "confessions": [
    {
      "id": 123,
      "tracking_code": "A1B2C3D4",
      "category": "Confession",
      "content": "Content preview...",
      "status": "Posted",
      "created_at": "2025-11-12T10:30:00.000Z"
    }
  ],
  "total": 150,
  "limit": 10,
  "offset": 0
}
```

#### 4. Update Confession Status (Admin)
```http
PUT /api/confessions/:code/status
```

**Request Body:**
```json
{
  "status": "Approved"
}
```

**Valid Status Values:**
- `Pending`
- `Approved`
- `Posted`
- `Rejected`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Status updated successfully",
  "confession": {
    "tracking_code": "A1B2C3D4",
    "status": "Approved",
    "updated_at": "2025-11-12T11:00:00.000Z"
  }
}
```

#### 5. Get Statistics
```http
GET /api/stats
```

**Response (200 OK):**
```json
{
  "success": true,
  "stats": {
    "total": 1500,
    "pending": 45,
    "approved": 30,
    "posted": 1400,
    "rejected": 25,
    "byCategory": {
      "Confession": 800,
      "Lost Love": 300,
      "Study": 200,
      "Other": 200
    }
  }
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Invalid request data"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Confession not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Server error occurred"
}
```

---

## 📁 Project Structure

```
anonymous-confessions/
├── 📄 server.js                 # Express server & API routes
├── 📄 package.json              # Dependencies & scripts
├── 📄 README.md                 # This file
├── 📄 LICENSE                   # MIT License
├── 📄 .gitignore               # Git ignore rules
├── 📄 confessions.db           # SQLite database (auto-generated)
│
├── 📁 public/                   # Frontend files (static)
│   ├── 📄 index.html           # Main submission page
│   ├── 📄 confession.html      # Tracking page
│   │
│   └── 📁 assets/
│       ├── 📁 css/
│       │   ├── 📄 style.css            # Custom styles
│       │   └── 📄 vendor.min.css       # Bootstrap & dependencies
│       │
│       ├── 📁 js/
│       │   ├── 📄 app.js               # Main application logic
│       │   └── 📄 scripts.js           # Helper functions
│       │
│       └── 📁 images/
│           ├── 📄 logo.png
│           └── 📄 favicon.png
│
└── 📁 docs/                     # Documentation
    ├── 📄 README.md            # Full documentation
    └── 📄 DEPLOYMENT.md        # Deployment guides
```

### Key Files Explained

| File | Purpose |
|------|---------|
| `server.js` | Express server, API routes, database logic |
| `public/index.html` | Confession submission form |
| `public/confession.html` | Confession tracking interface |
| `public/assets/js/app.js` | Frontend JavaScript (AJAX, form handling) |
| `public/assets/css/style.css` | Custom UI styles & animations |
| `confessions.db` | SQLite database (auto-created) |

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Database
DATABASE_PATH=./confessions.db

# Security (optional)
CORS_ORIGIN=*
MAX_CONTENT_LENGTH=5000

# Rate Limiting (optional)
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Custom Port

**Option 1: Environment Variable**
```bash
PORT=8080 npm start
```

**Option 2: Modify server.js**
```javascript
const PORT = process.env.PORT || 8080;
```

### Database Configuration

The database schema is defined in `server.js`:

```javascript
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

---

## 🚢 Deployment

### Option 1: Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-confession-app

# Deploy
git push heroku main

# Open app
heroku open
```

**Procfile:**
```
web: node server.js
```

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### Option 3: Docker

**Dockerfile:**
```dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

**Build & Run:**
```bash
docker build -t confession-app .
docker run -p 3000:3000 -v $(pwd)/data:/app confession-app
```

### Option 4: PM2 (Production)

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start server.js --name confession-app

# Auto-restart on reboot
pm2 startup
pm2 save

# Monitor
pm2 monit
```

### Option 5: VPS (DigitalOcean, AWS, etc.)

```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone & setup
git clone https://github.com/yourusername/anonymous-confessions.git
cd anonymous-confessions
npm install

# Run with PM2
pm2 start server.js
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 💻 Development

### Development Setup

```bash
# Install dev dependencies
npm install

# Run with auto-reload
npm run dev

# Watch for changes
nodemon server.js
```

### Project Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "init-db": "node init-db.js"
}
```

### Database Management

**View database:**
```bash
# Install SQLite CLI
sqlite3 confessions.db

# Run queries
SELECT * FROM confessions;
SELECT COUNT(*) FROM confessions WHERE status = 'Pending';
```

**Reset database:**
```bash
rm confessions.db
npm start  # Will recreate automatically
```

### Testing API

**Using cURL:**
```bash
# Submit confession
curl -X POST http://localhost:3000/api/confessions \
  -H "Content-Type: application/json" \
  -d '{"category":"Test","content":"Testing the API"}'

# Get confession
curl http://localhost:3000/api/confessions/A1B2C3D4

# Get stats
curl http://localhost:3000/api/stats
```

**Using Postman:**
1. Import the collection
2. Set base URL: `http://localhost:3000/api`
3. Test all endpoints

---

## 🔒 Security

### Important Security Considerations

⚠️ **This is a basic implementation. For production, implement:**

1. **Authentication & Authorization**
   - Add admin login system
   - Protect admin endpoints with JWT
   - Implement role-based access control

2. **Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

3. **Input Validation**
```javascript
const validator = require('validator');
// Sanitize input
const content = validator.escape(req.body.content);
```

4. **HTTPS/SSL**
   - Use Let's Encrypt for free SSL
   - Redirect HTTP to HTTPS

5. **SQL Injection Prevention**
   - Already using parameterized queries ✅
   - Never concatenate user input

6. **XSS Prevention**
   - Sanitize HTML output
   - Use Content Security Policy headers

7. **CORS Configuration**
```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}));
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Port Already in Use
```bash
# Find process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Or use different port:
PORT=3001 npm start
```

#### Database Locked
```bash
# Close all connections and restart
rm confessions.db
npm start
```

#### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Cannot GET /
```bash
# Ensure you're accessing the correct URL
http://localhost:3000  # NOT http://localhost:3000/index.html
```

#### CORS Errors
```javascript
// In server.js, ensure CORS is enabled
app.use(cors());
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with descriptive message**
   ```bash
   git commit -m "Add: Amazing new feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Write clear commit messages

### Code Style

```javascript
// Use const/let, not var
const apiUrl = '/api/confessions';

// Use async/await for promises
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Use meaningful variable names
const trackingCode = generateTrackingCode();
```

---

## 💡 Future Features & Roadmap

- [ ] Admin dashboard with analytics
- [ ] Email notifications for status changes
- [ ] Direct image upload (not just URLs)
- [ ] Advanced search and filtering
- [ ] Export confessions to CSV/JSON
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle
- [ ] Real-time updates with WebSocket
- [ ] Comment system
- [ ] Voting/reaction system

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Anonymous Confessions Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 📞 Support & Contact

- **Issues:** [GitHub Issues](https://github.com/yourusername/anonymous-confessions/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/anonymous-confessions/discussions)
- **Documentation:** [Full Docs](docs/README.md)
- **Deployment Guide:** [Deployment](docs/DEPLOYMENT.md)

---

## 🙏 Acknowledgments

- Bootstrap for UI framework
- Express.js community
- SQLite for lightweight database
- All contributors

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/anonymous-confessions?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/anonymous-confessions?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/anonymous-confessions)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/anonymous-confessions)

---

**Made with ❤️ by the community | [⭐ Star this repo](https://github.com/yourusername/anonymous-confessions) if you find it helpful!**

---

### Quick Links
- [🚀 Quick Start](#-quick-start)
- [📖 Usage Guide](#-usage-guide)
- [🔌 API Docs](#-api-documentation)
- [🚢 Deployment](#-deployment)
- [💻 Development](#-development)

# ⚡ Quick Setup Guide

## 📦 Installation (5 minutes)

### Step 1: Install Node.js
Download and install Node.js from: https://nodejs.org/
- Choose LTS version (recommended)
- Restart your terminal after installation

### Step 2: Verify Installation
```bash
node --version   # Should show v14 or higher
npm --version    # Should show 6 or higher
```

### Step 3: Install Project Dependencies
```bash
cd path/to/cfs-page
npm install
```

Wait for installation to complete (~1-2 minutes)

### Step 4: Start the Server
```bash
npm start
```

You should see:
```
Connected to SQLite database
Database schema initialized
Server running on http://localhost:3000
Backend API endpoints:
  POST   /api/confessions       - Submit confession
  GET    /api/confessions/:code - Track confession
  GET    /api/confessions       - Get recent confessions
  GET    /api/stats             - Get statistics
```

### Step 5: Open Browser
Open http://localhost:3000 in your browser

## ✅ Checklist

- [ ] Node.js installed (v14+)
- [ ] Dependencies installed (`npm install`)
- [ ] Server running (`npm start`)
- [ ] Browser opened (http://localhost:3000)
- [ ] Can submit confession
- [ ] Can track confession

## 🐛 Common Issues

### "npm not found"
- Restart terminal/command prompt
- Reinstall Node.js

### "Port already in use"
```bash
PORT=3001 npm start
```

### "Module not found"
```bash
npm install
```

## 📂 Project Structure

```
cfs-page/
├── public/           → Frontend files (HTML, CSS, JS)
├── docs/            → Documentation
├── server.js        → Backend API
├── package.json     → Dependencies
├── README.md        → Main documentation
└── SETUP.md         → This file
```

## 🎯 Next Steps

1. ✅ **Test the app** - Submit a confession
2. 📖 **Read full docs** - See [docs/README.md](docs/README.md)
3. 🚀 **Deploy** - See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 💡 Quick Commands

```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start

# View database
sqlite3 confessions.db
```

## 📞 Need Help?

- **Documentation:** [docs/README.md](docs/README.md)
- **Deployment Guide:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- **API Reference:** [docs/README.md#api-documentation](docs/README.md#api-documentation)

---

**Ready to deploy?** See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

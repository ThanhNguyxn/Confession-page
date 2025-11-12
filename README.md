# 💬 Anonymous Confession Page Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-lightgrey.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-v5.1-blue.svg)](https://www.sqlite.org/)
[![Vietnamese](https://img.shields.io/badge/Interface-Vietnamese-red.svg)](https://en.wikipedia.org/wiki/Vietnamese_language)
[![Secure](https://img.shields.io/badge/Admin-Password%20Protected-green.svg)](#)

A ready-to-use, modern anonymous confession platform template with **password-protected admin panel**. Perfect for schools, communities, or organizations. No login required for users - just deploy and start receiving confessions!

**🌐 Website Interface:** Vietnamese (tiếng Việt)  
**📖 Documentation:** English  
**🔐 Admin:** Password protected  
**🚀 Status:** Production Ready

---

## 📚 Quick Links

- **[📦 Installation & Setup Guide](SETUP.md)** - Complete step-by-step guide
- **[🌐 Deployment Guides](SETUP.md#deploy-to-production)** - Vercel, Railway, Heroku, VPS
- **[⚙️ Configuration](SETUP.md#advanced-configuration)** - Customize colors, categories, language
- **[🔒 Security](SETUP.md#security-best-practices)** - Best practices for production
- **[❓ Troubleshooting](SETUP.md#troubleshooting)** - Common issues & solutions

---

## ⚡ Quick Start

**Prerequisites:** Node.js v14+ ([Download here](https://nodejs.org/))

```bash
# 1. Clone repository
git clone https://github.com/ThanhNguyxn/Confession-page.git
cd Confession-page

# 2. Install dependencies
npm install

# 3. Set admin password in server.js (line 11)
# Change: const ADMIN_PASSWORD = 'admin123';

# 4. Start server
npm start

# 5. Open in browser
# Homepage:    http://localhost:3000
# Admin Panel: http://localhost:3000/admin.html (Password: admin123)
```

**📚 [Read Full Setup Guide →](SETUP.md)**

---

## ✨ Features

### 🏠 For Users
- ✅ **100% Anonymous** - No registration or personal data required
- ✅ **8 Categories** - Love, Family, Work, Study, Life, Secret, etc.
- ✅ **Photo Support** - Add image URLs (Imgur, Google Photos, etc.)
- ✅ **Tracking System** - Unique code to check confession status
- ✅ **Modern UI** - Beautiful gradient design, fully responsive

### 🛡️ For Admins
- ✅ **Password Protected** - Secure admin panel access
- ✅ **Dashboard** - Real-time statistics (Total, Pending, Approved, Rejected)
- ✅ **Easy Management** - One-click approve/reject confessions
- ✅ **Search & Filter** - Find confessions by code or content
- ✅ **Full Control** - View all submissions, change status anytime

### 🔧 For Developers
- ✅ **RESTful API** - Clean API endpoints for all operations
- ✅ **SQLite Database** - Lightweight, no external DB needed
- ✅ **Easy Deploy** - Works on Vercel, Railway, Heroku, VPS
- ✅ **Customizable** - Change colors, categories, language easily
- ✅ **Well Documented** - Complete setup and deployment guides

---

## 🎯 Perfect For

| Use Case | Description |
|----------|-------------|
| 🎓 **Schools & Universities** | Student confessions, anonymous feedback |
| 👥 **Communities** | Group discussions, secret sharing |
| 🏢 **Organizations** | Employee suggestions, anonymous feedback |
| 💬 **Social Platforms** | Secret sharing, confession boards |
| 🧠 **Mental Health** | Anonymous venting, support groups |

---

## 📸 Screenshots

### Homepage
![Homepage](https://img.shields.io/badge/Feature-Submit%20Confession-blue)
- Modern form with 8 categories
- Character counter (max 5000)
- Optional photo URL and notes
- Instant tracking code generation

### Tracking Page
![Tracking](https://img.shields.io/badge/Feature-Track%20Status-green)
- Enter tracking code to check status
- ⏳ **Chờ Duyệt** (Pending)
- ✅ **Đã Duyệt** (Approved)
- ❌ **Đã Từ Chối** (Rejected)

### Admin Panel 🔐
![Admin](https://img.shields.io/badge/Feature-Admin%20Dashboard-red)
- Password-protected login screen
- Statistics dashboard
- Filter by status
- Search functionality
- One-click moderation

---

## 📁 Project Structure

```
confession-page/
├── 📄 README.md              # This file (Quick overview)
├── 📄 SETUP.md               # Complete installation & deployment guide
├── 📄 package.json           # Dependencies
├── 📄 server.js              # Backend server + API
├── 📁 public/
│   ├── index.html            # Homepage (Vietnamese)
│   ├── confession.html       # Tracking page (Vietnamese)
│   ├── admin.html            # Admin panel (Vietnamese) 🔐
│   └── assets/
│       ├── css/              # Stylesheets
│       ├── js/               # JavaScript
│       └── images/           # Logo & favicon
└── 📄 confessions.db         # SQLite database (auto-created)
```

**Key Files:**
- `server.js` - Backend logic, API endpoints, admin password (line 11)
- `public/admin.html` - Admin panel with authentication
- `SETUP.md` - **Complete setup and deployment guide**

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/confessions` | Submit new confession | ❌ |
| GET | `/api/confessions/:code` | Track confession by code | ❌ |
| POST | `/api/admin/login` | Admin login | 🔐 |
| GET | `/api/admin/confessions` | Get all confessions | 🔐 |
| PUT | `/api/confessions/:code/status` | Update status | 🔐 |
| GET | `/api/stats` | Get statistics | ❌ |

**Full API Documentation:** [SETUP.md - API Reference](SETUP.md#api-reference)

---

## 🌐 Deployment

Deploy your confession page in minutes:

| Platform | Difficulty | Free Tier | HTTPS | Guide |
|----------|-----------|-----------|-------|-------|
| **Vercel** | ⭐ Easy | ✅ Yes | ✅ Auto | [Guide →](SETUP.md#option-1-vercel-easiest---recommended) |
| **Railway** | ⭐ Easy | ✅ Yes | ✅ Auto | [Guide →](SETUP.md#option-2-railway-easy) |
| **Heroku** | ⭐⭐ Medium | ✅ Yes | ✅ Auto | [Guide →](SETUP.md#option-3-heroku) |
| **VPS** | ⭐⭐⭐ Hard | ❌ Paid | 🔧 Manual | [Guide →](SETUP.md#option-4-your-own-server-vps) |

**📚 [Complete Deployment Guides →](SETUP.md#deploy-to-production)**

---

## 🔒 Security

### Default Admin Password

```javascript
// server.js - Line 11
const ADMIN_PASSWORD = 'admin123'; // ⚠️ CHANGE THIS BEFORE DEPLOYING!
```

### For Production

**Option 1: Edit server.js**
```javascript
const ADMIN_PASSWORD = 'YourSecurePassword2024!';
```

**Option 2: Use Environment Variable (Recommended)**
```bash
# .env file
ADMIN_PASSWORD=YourSecurePassword2024!
```

### Security Checklist

- ✅ Change default admin password
- ✅ Use HTTPS in production (auto on Vercel/Railway)
- ✅ Set environment variables
- ✅ Keep dependencies updated
- ✅ Backup database regularly

**📚 [Security Best Practices →](SETUP.md#security-best-practices)**

---

## ⚙️ Customization

### Quick Customizations

**Change Port:**
```javascript
// server.js - Line 9
const PORT = process.env.PORT || 3000; // Change 3000 to your port
```

**Change Colors:**
```css
/* public/assets/css/style.css */
:root {
    --primary-color: #6366f1;     /* Main purple - change this */
    --secondary-color: #ec4899;   /* Pink accent - change this */
}
```

**Add/Edit Categories:**
```html
<!-- public/index.html - Around line 60 -->
<option value="Gaming">🎮 Game</option>
<option value="Sports">⚽ Thể Thao</option>
```

**Replace Logo:**
- Replace `public/assets/images/logo.png`
- Replace `public/assets/images/favicon.png`

**Translate to English:**
- Edit HTML files and replace Vietnamese text
- No code changes needed!

**📚 [Advanced Customization Guide →](SETUP.md#advanced-configuration)**

---

## 🛠 Built With

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express** | Web server framework |
| **SQLite** | Lightweight database |
| **Vanilla JavaScript** | Frontend (no frameworks) |
| **CSS3** | Modern, responsive design |

**No MongoDB, MySQL, or React needed!** - Everything included.

---

## 📊 Database

**View/Edit Database:**
- Download [DB Browser for SQLite](https://sqlitebrowser.org/)
- Open `confessions.db` file
- View, edit, export data

**Backup Database:**
```bash
cp confessions.db confessions-backup.db
```

**📚 [Database Management Guide →](SETUP.md#database-management)**

---

## 📖 Documentation

### Main Documentation

| Document | Description |
|----------|-------------|
| **[README.md](README.md)** | This file - Quick overview & getting started |
| **[SETUP.md](SETUP.md)** | Complete installation, deployment & configuration guide |

### SETUP.md Includes

- 📦 **Installation Guide** - Step-by-step from scratch
- 🛡️ **Admin Panel Setup** - First login, features, password change
- 🌐 **Deployment Guides** - Vercel, Railway, Heroku, VPS
- ⚙️ **Advanced Configuration** - Environment variables, customization
- 🔒 **Security Best Practices** - Production security tips
- ❓ **Troubleshooting** - Common issues & solutions
- 📊 **Database Management** - Backup, export, restore
- 🆘 **Getting Help** - Support channels & resources

**📚 [Read Complete Guide →](SETUP.md)**

---

## ❓ FAQ

**Q: Can I use this for commercial projects?**  
A: Yes! MIT License allows commercial use.

**Q: Do I need to know coding?**  
A: Basic knowledge helps, but setup is very simple. Follow [SETUP.md](SETUP.md).

**Q: Can I change the language to English?**  
A: Yes! Just edit the HTML files. See [customization guide](SETUP.md#translate-to-english).

**Q: Is it secure for production?**  
A: Yes, but change the admin password! See [security guide](SETUP.md#security-best-practices).

**Q: Can I add more features?**  
A: Yes! It's open source. Modify as needed.

**More questions?** See [SETUP.md - Getting Help](SETUP.md#getting-help)

---

## 📝 License

MIT License - Free to use for personal and commercial projects!

```
Copyright (c) 2025 Anonymous Confession Page

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

## 🙏 Credits

**Built with ❤️ using:**
- Node.js & Express
- SQLite Database
- Pure JavaScript (no frameworks)
- Modern CSS3

**Special Thanks:**
- All contributors
- Open source community
- Users who provide feedback

---

## 📞 Support & Contact

### Get Help

- 📖 **Documentation**: [SETUP.md](SETUP.md) - Complete guide
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/ThanhNguyxn/Confession-page/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/ThanhNguyxn/Confession-page/discussions)
- ⭐ **Star this repo** if you find it useful!

### Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 🚀 Getting Started

**Ready to deploy?**

1. ✅ Read [SETUP.md](SETUP.md) for complete guide
2. ✅ Clone this repository
3. ✅ Install dependencies (`npm install`)
4. ✅ Change admin password in `server.js`
5. ✅ Start server (`npm start`)
6. ✅ Test locally at `http://localhost:3000`
7. ✅ Deploy to production (see [deployment guide](SETUP.md#deploy-to-production))
8. ✅ Set environment variables
9. ✅ Start receiving confessions! 🎉

---

<div align="center">

**Made with 💜 by developers, for everyone**

⭐ **Star this repository if you find it useful!** ⭐

[![GitHub Stars](https://img.shields.io/github/stars/ThanhNguyxn/Confession-page?style=social)](https://github.com/ThanhNguyxn/Confession-page)
[![GitHub Forks](https://img.shields.io/github/forks/ThanhNguyxn/Confession-page?style=social)](https://github.com/ThanhNguyxn/Confession-page/fork)

[🏠 Homepage](https://github.com/ThanhNguyxn/Confession-page) • 
[📚 Setup Guide](SETUP.md) • 
[🐛 Report Bug](https://github.com/ThanhNguyxn/Confession-page/issues) • 
[💡 Request Feature](https://github.com/ThanhNguyxn/Confession-page/issues)

</div>


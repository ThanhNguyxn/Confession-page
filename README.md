# 💬 Anonymous Confession Page Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-lightgrey.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-v5.1-blue.svg)](https://www.sqlite.org/)

A ready-to-use, modern anonymous confession platform template. Perfect for schools, communities, or organizations. No login required - just deploy and start receiving confessions!

## ✨ What You Get

- ✅ **Fully Functional Website** - Ready to use out of the box
- ✅ **100% Anonymous** - No user tracking or personal data collection
- ✅ **Modern Design** - Beautiful gradient UI with responsive layout
- ✅ **Tracking System** - Users get unique codes to track their submissions
- ✅ **Admin Controls** - Approve/reject confessions via API
- ✅ **Lightweight** - Only 40KB total, super fast loading
- ✅ **Easy Setup** - Get running in 5 minutes!

## 🎯 Perfect For

- Schools and universities (student confessions)
- Community groups (anonymous feedback)
- Organizations (employee suggestions)
- Social platforms (secret sharing)
- Mental health support (anonymous venting)

## 📸 Preview

**Homepage - Submit Confession**
- Clean form with 8 categories (Love, Family, Work, Study, etc.)
- Character counter (max 5000)
- Optional photo URL and notes
- Instant tracking code generation

**Tracking Page - Check Status**
- Enter tracking code to see confession status
- Three states: Pending, Approved, Rejected
- Full confession details display

---

## 🚀 Quick Start (5 Minutes!)

### Step 1: Download & Install Node.js

**If you don't have Node.js yet:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (recommended)
3. Install it (just click Next → Next → Install)
4. Restart your computer

**Check if installed:**
```bash
node --version
# Should show v14.0.0 or higher
```

### Step 2: Download This Project

**Option A - Using Git:**
```bash
git clone https://github.com/yourusername/confession-page.git
cd confession-page
```

**Option B - Direct Download:**
1. Click the green "Code" button on GitHub
2. Click "Download ZIP"
3. Extract the ZIP file
4. Open terminal/command prompt in that folder

### Step 3: Install Dependencies

```bash
npm install
```

Wait 1-2 minutes for installation to complete.

### Step 4: Start Your Server

```bash
npm start
```

You should see:
```
Connected to SQLite database
Database schema initialized
Server running on http://localhost:3000
```

### Step 5: Open Your Website

Open your browser and go to:
```
http://localhost:3000
```

**🎉 Done! Your confession page is now running!**

---

## 📱 How to Use

### For Regular Users:

1. **Submit a Confession:**
   - Go to homepage
   - Choose category (Love, Family, Work, etc.)
   - Type your confession (max 5000 characters)
   - Add photo URL (optional)
   - Click "Submit"
   - **SAVE YOUR TRACKING CODE!** (Example: A1B2C3D4)

2. **Track Your Confession:**
   - Click "Theo Dõi" (Track) in menu
   - Enter your tracking code
   - See status:
     - ⏳ **Pending** = Waiting for review
     - ✅ **Approved** = Published!
     - ❌ **Rejected** = Not approved

### For Administrators:

**Manage confessions using API calls:**

```bash
# View all pending confessions (use a database viewer)
# Or build an admin panel (not included in this template)

# Approve a confession
curl -X PUT http://localhost:3000/api/confessions/A1B2C3D4/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Approved"}'

# Reject a confession
curl -X PUT http://localhost:3000/api/confessions/A1B2C3D4/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Rejected"}'

# Get statistics
curl http://localhost:3000/api/stats
```

---

## 🔌 API Reference (For Developers)

All endpoints return JSON. Base URL: `http://localhost:3000/api`

### 1. Submit Confession
```http
POST /api/confessions
Content-Type: application/json

{
  "category": "Love",
  "content": "Your confession here...",
  "photo": "https://i.imgur.com/photo.jpg",  // optional
  "note": "Note for admin"                    // optional
}
```

**Returns:** `{ success: true, trackingCode: "A1B2C3D4" }`

### 2. Track Confession
```http
GET /api/confessions/A1B2C3D4
```

**Returns:** Confession details with status

### 3. Update Status (Admin Only)
```http
PUT /api/confessions/A1B2C3D4/status
Content-Type: application/json

{ "status": "Approved" }  // or "Rejected" or "Pending"
```

### 4. Get Statistics
```http
GET /api/stats
```

**Returns:** Total, approved, pending, rejected counts

---

## 📁 What's Inside

```
confession-page/
├── public/              # Your website files
│   ├── index.html      # Homepage (submit confession)
│   ├── confession.html # Tracking page
│   └── assets/         # CSS, JS, images
├── server.js           # Backend server
├── package.json        # Dependencies list
├── confessions.db      # Database (auto-created)
└── README.md          # This file
```

**Files you can customize:**
- `public/index.html` - Homepage design
- `public/confession.html` - Tracking page design
- `public/assets/css/style.css` - Colors, fonts, layout
- `public/assets/images/` - Logo and favicon

---

## 🛠 Built With

- **Node.js** - JavaScript runtime
- **Express** - Web server framework
- **SQLite** - Lightweight database (no MySQL/MongoDB needed!)
- **Vanilla JavaScript** - No React/Vue, just simple JS
- **CSS3** - Modern, responsive design

---

## ⚙️ Customization

### Change Port (Optional)

Edit `server.js` line 8:
```javascript
const PORT = process.env.PORT || 3000;  // Change 3000 to your port
```

### Change Colors

Edit `public/assets/css/style.css`:
```css
:root {
    --primary-color: #6366f1;     /* Main color */
    --secondary-color: #ec4899;   /* Accent color */
    /* ... change these to your brand colors */
}
```

### Change Logo & Favicon

Replace these files:
- `public/assets/images/logo.png` (your logo)
- `public/assets/images/favicon.png` (browser icon)

---

## 🌐 Deploy to Internet (Make it Public)

### Option 1: Vercel (Easiest - Free)

1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
```bash
npm i -g vercel
```
3. Deploy:
```bash
vercel
```
4. Follow prompts → Your site is live! 🎉

### Option 2: Railway (Easy - Free)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Done! Railway auto-deploys 🚀

### Option 3: Heroku (Traditional - Free tier available)

```bash
# Install Heroku CLI first
heroku login
heroku create my-confession-page
git push heroku main
heroku open
```

### Option 4: Your Own Server (Advanced)

```bash
# SSH to your server
git clone your-repo
cd confession-page
npm install --production
npm install -g pm2
pm2 start server.js --name "confessions"
pm2 startup
pm2 save
```

---

## 🔒 Privacy & Security

✅ No user registration needed  
✅ No IP addresses stored  
✅ No personal data collected  
✅ Tracking codes are random  
✅ Use HTTPS in production (automatic on Vercel/Railway)

---

## ❓ Troubleshooting

**Server won't start?**
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` folder and run `npm install` again
- Check if port 3000 is already in use

**Can't submit confession?**
- Check browser console for errors (F12)
- Make sure server is running
- Try restarting the server

**Database issues?**
- Delete `confessions.db` file and restart server
- Database will be recreated automatically

---

## 💡 Tips & Tricks

**Want an admin panel?**
- Use [DB Browser for SQLite](https://sqlitebrowser.org/) to view/edit database
- Or build your own admin interface using the API

**Want to customize categories?**
- Edit `public/index.html` line 60-67 (the `<select>` options)

**Want to change text from Vietnamese to English?**
- Edit `public/index.html` and `public/confession.html`
- Change all Vietnamese text to your language

**Want to add email notifications?**
- Install nodemailer: `npm install nodemailer`
- Add email code in `server.js` after confession submission

---

## 📝 License

MIT License - Free to use for personal and commercial projects!

## 🙏 Credits

Built with ❤️ using Node.js and Express

---

## 📞 Need Help?

- 📖 Read this README carefully
- 🐛 [Report bugs](https://github.com/yourusername/confession-page/issues)
- ⭐ Give this project a star if you find it useful!

---

**Made with 💜 by developers, for everyone**


# 💬 Anonymous Confession Page Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-lightgrey.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-v5.1-blue.svg)](https://www.sqlite.org/)

A ready-to-use, modern anonymous confession platform template with **admin panel**. Perfect for schools, communities, or organizations. No login required - just deploy and start receiving confessions!

**🌐 Website Interface:** Vietnamese (tiếng Việt)  
**📖 Documentation:** English

## ✨ What You Get

- ✅ **Fully Functional Website** - Ready to use out of the box (Vietnamese interface)
- ✅ **Admin Panel** - Easy-to-use dashboard to approve/reject confessions
- ✅ **100% Anonymous** - No user tracking or personal data collection
- ✅ **Secure & Private** - All confessions are stored securely with no personal information
- ✅ **Modern Design** - Beautiful gradient UI with responsive layout
- ✅ **Tracking System** - Users get unique codes to monitor their submissions
- ✅ **Category-based** - 8 predefined categories (Love, Family, Work, etc.)
- ✅ **Lightweight** - Only 40KB total, super fast loading
- ✅ **Easy Setup** - Get running in 5 minutes!

## 🎯 Perfect For

- Schools and universities (student confessions in Vietnamese)
- Community groups in Vietnam (anonymous feedback)
- Organizations (employee suggestions)
- Social platforms (secret sharing)
- Mental health support (anonymous venting)

## 📸 Preview

**🏠 Homepage** (`/`)
- Submit confession form with categories
- Character counter (max 5000)
- Optional photo URL and notes
- Vietnamese interface

**🔍 Tracking Page** (`/confession.html`)
- Enter tracking code to see status
- Three states: Pending ⏳, Approved ✅, Rejected ❌

**🛡️ Admin Panel** (`/admin.html`) - NEW!
- View all confessions in one place
- Filter by status (All, Pending, Approved, Rejected)
- Search by code or content
- One-click approve/reject buttons
- Real-time statistics dashboard
- No login required (add authentication if needed)

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

1. **Submit a Confession** (Gửi Tâm Sự):
   - Go to homepage: `http://localhost:3000`
   - Choose category (Love, Family, Work, etc.)
   - Type your confession (max 5000 characters, Vietnamese)
   - Add photo URL (optional)
   - Add note for admin (optional)
   - Click "Gửi Tâm Sự" (Submit)
   - **SAVE YOUR TRACKING CODE!** (Example: A1B2C3D4)

2. **Track Your Confession** (Theo Dõi):
   - Click "Theo Dõi" (Track) in menu
   - Enter your tracking code
   - See status:
     - ⏳ **Chờ Duyệt** (Pending) = Waiting for review
     - ✅ **Đã Duyệt** (Approved) = Published!
     - ❌ **Đã Từ Chối** (Rejected) = Not approved

### For Administrators:

**New Admin Panel** - Much easier than API!

1. **Access Admin Panel:**
   ```
   http://localhost:3000/admin.html
   ```

2. **What You Can Do:**
   - 📊 View statistics (Total, Pending, Approved, Rejected)
   - 📋 See all confessions in one place
   - 🔍 Filter by status (All, Pending, Approved, Rejected)
   - 🔎 Search by tracking code or content
   - ✅ Approve confessions with one click
   - ❌ Reject inappropriate confessions
   - ⏳ Set back to pending if needed
   - 🔄 Real-time refresh

3. **Managing Confessions:**
   - Click "✅ Duyệt" to approve
   - Click "❌ Từ Chối" to reject
   - Click "⏳ Chờ Duyệt" to set back to pending
   - Use filters to focus on pending items
   - Search to find specific confessions

**Alternative: Using API (for developers)**

```bash
# Approve a confession
curl -X PUT http://localhost:3000/api/confessions/A1B2C3D4/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Approved"}'

# Reject a confession
curl -X PUT http://localhost:3000/api/confessions/A1B2C3D4/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Rejected"}'
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

### 3. Update Status (Admin)
```http
PUT /api/confessions/A1B2C3D4/status
Content-Type: application/json

{ "status": "Approved" }  // or "Rejected" or "Pending"
```

### 4. Get All Confessions (Admin)
```http
GET /api/admin/confessions
```

**Returns:** Array of all confessions (for admin panel)

### 5. Get Statistics
```http
GET /api/stats
```

**Returns:** Total, approved, pending, rejected counts

---

## 📁 What's Inside

```
confession-page/
├── public/              # Your website files
│   ├── index.html      # Homepage (submit confession) - Vietnamese
│   ├── confession.html # Tracking page - Vietnamese
│   ├── admin.html      # Admin panel - Vietnamese ⭐ NEW!
│   └── assets/         # CSS, JS, images
├── server.js           # Backend server + API
├── package.json        # Dependencies list
├── confessions.db      # Database (auto-created)
└── README.md          # This file (English)
```

**Files you can customize:**
- `public/index.html` - Homepage design (currently Vietnamese)
- `public/confession.html` - Tracking page (currently Vietnamese)
- `public/admin.html` - Admin panel (currently Vietnamese)
- `public/assets/css/style.css` - Colors, fonts, layout
- `public/assets/images/` - Logo and favicon

**Want English interface?**
- Edit the HTML files and change Vietnamese text to English
- All functionality remains the same
- No code changes needed, just text replacement

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

**Using the Admin Panel:**
- Access at: `http://localhost:3000/admin.html`
- No login required (add authentication if needed for production)
- Use filters to manage pending confessions efficiently
- Search function helps find specific confessions quickly

**Want to add authentication to admin panel?**
- Add a simple password check in `admin.html`
- Or use middleware in `server.js` for `/api/admin/*` routes
- Recommended for production deployments

**Want to change from Vietnamese to English?**
1. Open `public/index.html`
2. Find Vietnamese text (e.g., "Trang Chủ", "Gửi Tâm Sự")
3. Replace with English (e.g., "Home", "Submit Confession")
4. Repeat for `confession.html` and `admin.html`
5. No code changes needed!

**Want to customize categories?**
- Edit `public/index.html` line 60-67 (the `<select>` options)
- Add/remove/edit category names and emojis

**Want to view database directly?**
- Use [DB Browser for SQLite](https://sqlitebrowser.org/)
- Open `confessions.db` file
- You can view/edit all data manually

**Want to add email notifications?**
- Install nodemailer: `npm install nodemailer`
- Add email code in `server.js` after confession submission
- Send notification to admin when new confession arrives

**Want to make it multi-language?**
- Create `public/index-en.html` (English version)
- Create `public/index-vi.html` (Vietnamese version)  
- Add language switcher button
- Or use i18n library for dynamic translation

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


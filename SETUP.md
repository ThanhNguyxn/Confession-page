# 📦 Installation & Setup Guide

Complete guide to install and configure your Anonymous Confession Page.

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

**Option A - Using Git (Recommended):**
```bash
git clone https://github.com/ThanhNguyxn/Confession-page.git
cd Confession-page
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

Wait 1-2 minutes for installation to complete. You should see:
```
added XXX packages
```

### Step 4: Configure Admin Authentication

**Set up admin password (Important!):**

1. Open `server.js` in a text editor
2. Find this line (around line 8):
```javascript
const ADMIN_PASSWORD = 'admin123'; // Change this!
```
3. Change `'admin123'` to your own strong password
4. Save the file

**Example:**
```javascript
const ADMIN_PASSWORD = 'MySecurePassword2024!';
```

⚠️ **Important:** Never share this password publicly!

### Step 5: Start Your Server

```bash
npm start
```

You should see:
```
Connected to SQLite database
Database schema initialized
Server running on http://localhost:3000
```

### Step 6: Test Your Website

Open your browser and go to:
```
http://localhost:3000
```

**Test all pages:**
- 🏠 Homepage: `http://localhost:3000`
- 🔍 Tracking: `http://localhost:3000/confession.html`
- 🛡️ Admin Panel: `http://localhost:3000/admin.html`

**🎉 Done! Your confession page is now running!**

---

## 🛡️ Admin Panel Setup

### First Time Access

1. Go to `http://localhost:3000/admin.html`
2. You'll see a login screen
3. Enter the password you set in Step 4
4. Click "Đăng Nhập" (Login)

### Admin Features

Once logged in, you can:
- 📊 View statistics (Total, Pending, Approved, Rejected)
- 📋 See all confessions
- 🔍 Filter by status
- 🔎 Search confessions
- ✅ Approve confessions
- ❌ Reject confessions
- ⏳ Set back to pending

### Logout

- Click "Đăng Xuất" (Logout) button in the admin panel
- Or close the browser tab

### Change Admin Password

1. Open `server.js`
2. Edit line 8:
```javascript
const ADMIN_PASSWORD = 'YourNewPassword';
```
3. Save and restart server:
```bash
npm start
```

---

## 🌐 Deploy to Production

### Option 1: Vercel (Easiest - Recommended)

**Why Vercel?**
- Free hosting
- Automatic HTTPS
- Easy deployment
- Good for Node.js apps

**Steps:**

1. Create account at [vercel.com](https://vercel.com)

2. Install Vercel CLI:
```bash
npm i -g vercel
```

3. Login:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Follow prompts:
   - Set up and deploy? → **Yes**
   - Which scope? → **Your account**
   - Link to existing project? → **No**
   - Project name? → **confession-page** (or your name)
   - Directory? → **./** (just press Enter)

6. Wait for deployment... Done! 🎉

7. **Set environment variable (Admin Password):**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to Settings → Environment Variables
   - Add new variable:
     - Name: `ADMIN_PASSWORD`
     - Value: `YourSecurePassword`
   - Save and redeploy

### Option 2: Railway (Easy)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add environment variable:
   - Key: `ADMIN_PASSWORD`
   - Value: Your password
6. Done! Railway auto-deploys 🚀

### Option 3: Heroku

```bash
# Install Heroku CLI first
heroku login
heroku create my-confession-page

# Set admin password
heroku config:set ADMIN_PASSWORD="YourSecurePassword"

# Deploy
git push heroku main
heroku open
```

### Option 4: Your Own Server (VPS)

**Requirements:**
- Ubuntu/Debian server
- Node.js installed
- PM2 for process management

**Steps:**

1. SSH to your server:
```bash
ssh user@your-server-ip
```

2. Install Node.js (if not installed):
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Clone your repository:
```bash
git clone https://github.com/ThanhNguyxn/Confession-page.git
cd Confession-page
```

4. Install dependencies:
```bash
npm install --production
```

5. Create `.env` file:
```bash
nano .env
```

Add this:
```env
PORT=3000
ADMIN_PASSWORD=YourSecurePassword
NODE_ENV=production
```

Save (Ctrl+O, Enter, Ctrl+X)

6. Install PM2:
```bash
sudo npm install -g pm2
```

7. Start app:
```bash
pm2 start server.js --name "confessions"
pm2 save
pm2 startup
```

8. Configure Nginx (optional, for domain):
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/confession
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

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

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/confession /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## ⚙️ Advanced Configuration

### Environment Variables

Create `.env` file in root directory:

```env
# Server Port
PORT=3000

# Admin Password (REQUIRED in production!)
ADMIN_PASSWORD=YourSecurePassword

# Environment
NODE_ENV=production

# Database Path (optional)
DB_PATH=./confessions.db

# Session Secret (optional, for better security)
SESSION_SECRET=some-random-secret-key-here
```

### Change Port

**Method 1: Edit server.js**
```javascript
const PORT = process.env.PORT || 3000; // Change 3000
```

**Method 2: Use environment variable**
```bash
PORT=8080 npm start
```

### Customize Categories

Edit `public/index.html` around line 60:

```html
<select id="category" name="category" class="form-control" required>
    <option value="">Chọn chủ đề...</option>
    <option value="Love">💕 Tình Yêu</option>
    <option value="Family">👨‍👩‍👧 Gia Đình</option>
    <!-- Add your own categories here -->
    <option value="Gaming">🎮 Game</option>
    <option value="Sports">⚽ Thể Thao</option>
</select>
```

### Change Colors & Design

Edit `public/assets/css/style.css`:

```css
:root {
    --primary-color: #6366f1;     /* Main purple */
    --primary-dark: #4f46e5;
    --primary-light: #818cf8;
    --secondary-color: #ec4899;   /* Pink accent */
    --success-color: #10b981;     /* Green */
    --warning-color: #f59e0b;     /* Orange */
    --danger-color: #ef4444;      /* Red */
    /* Change these to your brand colors */
}
```

### Replace Logo & Favicon

1. Prepare your images:
   - Logo: PNG, recommended 200x50px
   - Favicon: PNG, 32x32px or 64x64px

2. Replace files:
   - `public/assets/images/logo.png`
   - `public/assets/images/favicon.png`

3. No code changes needed!

### Translate to English

1. Open each HTML file:
   - `public/index.html`
   - `public/confession.html`
   - `public/admin.html`

2. Find Vietnamese text and replace:
   - "Trang Chủ" → "Home"
   - "Gửi Tâm Sự" → "Submit Confession"
   - "Theo Dõi" → "Track"
   - "Quản Lý" → "Admin"
   - etc.

3. No JavaScript changes needed!

---

## 🔒 Security Best Practices

### For Production:

1. **Always use strong admin password**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols
   - Don't use common words

2. **Use HTTPS**
   - Automatically enabled on Vercel/Railway
   - Use Let's Encrypt on your own server

3. **Set environment variables**
   - Never hardcode passwords in code
   - Use `.env` file locally
   - Use platform settings for production

4. **Add rate limiting (optional)**
   ```bash
   npm install express-rate-limit
   ```
   
   Add to `server.js`:
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
       windowMs: 15 * 60 * 1000, // 15 minutes
       max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

5. **Backup database regularly**
   ```bash
   # Create backup
   cp confessions.db confessions-backup-$(date +%Y%m%d).db
   ```

---

## ❓ Troubleshooting

### Server won't start

**Error: `EADDRINUSE: address already in use`**
- Port 3000 is already in use
- Solution:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -i :3000
  kill -9 <PID>
  ```

**Error: `Cannot find module 'express'`**
- Dependencies not installed
- Solution:
  ```bash
  npm install
  ```

### Can't access admin panel

**Shows "Access Denied"**
- Wrong password
- Check password in `server.js` or `.env`

**Login screen doesn't appear**
- JavaScript not loading
- Check browser console (F12)
- Make sure `admin.html` has authentication code

### Database issues

**Error: `Database locked`**
- Multiple instances running
- Solution: Stop all Node processes
  ```bash
  # Windows
  taskkill /F /IM node.exe
  
  # Linux/Mac
  killall node
  ```

**Database corrupted**
- Delete database and restart:
  ```bash
  rm confessions.db
  npm start
  ```

### Deployment issues

**Vercel: Build failed**
- Check Node.js version in `package.json`:
  ```json
  "engines": {
    "node": "18.x"
  }
  ```

**Heroku: Application error**
- Check logs:
  ```bash
  heroku logs --tail
  ```

---

## 📊 Database Management

### View Database

**Option 1: DB Browser for SQLite (GUI)**
1. Download from [sqlitebrowser.org](https://sqlitebrowser.org/)
2. Install and open
3. File → Open Database → Select `confessions.db`
4. Browse data, run queries, edit records

**Option 2: Command Line**
```bash
sqlite3 confessions.db
sqlite> SELECT * FROM confessions;
sqlite> .exit
```

### Backup Database

**Manual backup:**
```bash
cp confessions.db backups/confessions-backup-$(date +%Y%m%d).db
```

**Automated backup script (Linux/Mac):**

Create `backup.sh`:
```bash
#!/bin/bash
BACKUP_DIR="backups"
DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p $BACKUP_DIR
cp confessions.db $BACKUP_DIR/confessions-$DATE.db

# Keep only last 7 backups
ls -t $BACKUP_DIR/confessions-*.db | tail -n +8 | xargs rm -f

echo "Backup created: confessions-$DATE.db"
```

Run daily with cron:
```bash
chmod +x backup.sh
crontab -e
# Add this line:
0 2 * * * /path/to/backup.sh
```

### Export Data

**Export to CSV:**
```bash
sqlite3 confessions.db
sqlite> .headers on
sqlite> .mode csv
sqlite> .output confessions.csv
sqlite> SELECT * FROM confessions;
sqlite> .exit
```

**Export to JSON (using Node.js):**

Create `export.js`:
```javascript
const sqlite3 = require('sqlite3');
const fs = require('fs');

const db = new sqlite3.Database('./confessions.db');

db.all('SELECT * FROM confessions', (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.writeFileSync('confessions.json', JSON.stringify(rows, null, 2));
    console.log('Exported to confessions.json');
    db.close();
});
```

Run:
```bash
node export.js
```

---

## 🆘 Getting Help

### Common Questions

**Q: Can I use MySQL/PostgreSQL instead of SQLite?**
A: Yes! You'll need to modify `server.js` and install the appropriate driver.

**Q: Can I add user registration?**
A: Yes, but it defeats the purpose of "anonymous" confessions. Consider carefully.

**Q: How do I add multiple admin accounts?**
A: You'll need to implement a proper authentication system with user database.

**Q: Can I show approved confessions on homepage?**
A: Yes! There's already an API endpoint. Create a public view page.

**Q: Is this production-ready?**
A: For small-scale use, yes. For large scale, consider adding:
  - Rate limiting
  - Better authentication
  - Caching
  - CDN for static files

### Support Channels

- 📖 **Documentation**: This file + README.md
- 🐛 **Report Bugs**: [GitHub Issues](https://github.com/ThanhNguyxn/Confession-page/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/ThanhNguyxn/Confession-page/discussions)

---

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/guide)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)

---

**Made with 💜 - Happy Confessing!**


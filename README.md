# Anonymous Confessions Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-lightgrey.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-v5.1-blue.svg)](https://www.sqlite.org/)

A modern, secure, and anonymous confession platform where users can share their thoughts, secrets, and feelings without revealing their identity. Built with Node.js, Express, and SQLite.

## 🌟 Features

- **100% Anonymous**: No registration or login required
- **Secure & Private**: All confessions are stored securely with no personal information
- **Category-based**: Organize confessions by topics (Love, Family, Work, etc.)
- **Tracking System**: Get a unique tracking code to monitor your confession status
- **Admin Moderation**: Built-in system for reviewing and approving confessions
- **Responsive Design**: Beautiful UI that works on all devices
- **RESTful API**: Clean and well-documented API endpoints

## 📋 Table of Contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Demo

![Homepage Screenshot](docs/screenshot-home.png)
*Homepage with confession submission form*

![Tracking Page Screenshot](docs/screenshot-tracking.png)
*Confession tracking page*

## 💻 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Step-by-Step Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/anonymous-confessions.git
cd anonymous-confessions
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment variables** (optional)
```bash
# Create a .env file in the root directory
PORT=3000
NODE_ENV=development
```

4. **Initialize the database**
The database will be automatically created when you first run the server.

5. **Start the server**
```bash
# Development mode
npm start

# Production mode
npm run prod
```

6. **Access the application**
Open your browser and navigate to:
```
http://localhost:3000
```

## 📖 Usage

### For Users

1. **Submit a Confession**
   - Visit the homepage
   - Select a category
   - Write your confession (up to 5000 characters)
   - Optionally add a photo URL or note
   - Click "Submit"
   - Save your tracking code!

2. **Track Your Confession**
   - Go to the tracking page
   - Enter your tracking code
   - View the status of your confession:
     - **Pending**: Waiting for review
     - **Approved**: Published and visible
     - **Rejected**: Not approved (violates policies)

### For Administrators

Use the API endpoints to manage confessions:

```bash
# Update confession status
curl -X PUT http://localhost:3000/api/confessions/ABCD1234/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Approved"}'
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Submit a Confession
```http
POST /api/confessions
Content-Type: application/json

{
  "category": "Love",
  "content": "Your confession text here...",
  "photo": "https://example.com/image.jpg",  // Optional
  "note": "Additional note for admin"        // Optional
}
```

**Response:**
```json
{
  "success": true,
  "trackingCode": "A1B2C3D4",
  "message": "Confession submitted successfully!",
  "id": 123
}
```

#### 2. Track a Confession
```http
GET /api/confessions/:code
```

**Response:**
```json
{
  "success": true,
  "confession": {
    "id": 123,
    "tracking_code": "A1B2C3D4",
    "category": "Love",
    "content": "Your confession...",
    "status": "Pending",
    "created_at": "2025-01-15 10:30:00",
    "updated_at": "2025-01-15 10:30:00"
  }
}
```

#### 3. Get Recent Approved Confessions
```http
GET /api/confessions?limit=10
```

**Response:**
```json
{
  "success": true,
  "confessions": [
    {
      "tracking_code": "A1B2C3D4",
      "category": "Love",
      "content": "First 200 characters...",
      "created_at": "2025-01-15 10:30:00"
    }
  ]
}
```

#### 4. Update Confession Status (Admin)
```http
PUT /api/confessions/:code/status
Content-Type: application/json

{
  "status": "Approved"  // Pending, Approved, or Rejected
}
```

**Response:**
```json
{
  "success": true,
  "message": "Status updated successfully"
}
```

#### 5. Get Statistics
```http
GET /api/stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 150,
    "approved": 120,
    "pending": 25,
    "rejected": 5,
    "acceptanceRate": "80.0"
  }
}
```

## 📁 Project Structure

```
anonymous-confessions/
├── public/                      # Frontend files
│   ├── index.html              # Homepage
│   ├── confession.html         # Tracking page
│   └── assets/
│       ├── css/
│       │   ├── style.css       # Main styles
│       │   └── vendor.min.css  # Reset styles
│       ├── js/
│       │   ├── app.js          # Main application logic
│       │   └── scripts.js      # Additional utilities
│       └── images/
│           ├── logo.png        # Logo image
│           └── favicon.png     # Favicon
├── docs/                        # Documentation
│   ├── DEPLOYMENT.md           # Deployment guide
│   └── README.md               # Additional docs
├── server.js                    # Express server & API
├── package.json                 # Dependencies
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🛠 Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin resource sharing

### Frontend
- **Vanilla JavaScript** - No frameworks needed
- **CSS3** - Modern styling with CSS variables
- **HTML5** - Semantic markup
- **Responsive Design** - Mobile-first approach

### Features
- RESTful API architecture
- MVC-inspired separation of concerns
- Error handling and validation
- SQL injection prevention (parameterized queries)

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Database Configuration
DB_PATH=./confessions.db

# CORS Configuration (optional)
CORS_ORIGIN=*
```

### Database Schema

The SQLite database uses the following schema:

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

## 🚢 Deployment

### Deploy to Heroku

1. Create a Heroku app:
```bash
heroku create your-app-name
```

2. Push to Heroku:
```bash
git push heroku main
```

3. Open your app:
```bash
heroku open
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Railway

1. Connect your GitHub repository to Railway
2. Railway will automatically detect and deploy your app
3. Set environment variables in Railway dashboard

### Deploy to Your Own Server

1. SSH into your server
2. Clone the repository
3. Install dependencies: `npm install --production`
4. Use PM2 to keep the app running:
```bash
npm install -g pm2
pm2 start server.js --name "confessions"
pm2 save
pm2 startup
```

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Inspired by anonymous confession platforms
- Built with modern web technologies
- Thanks to all contributors

## 📧 Contact

For questions or support:
- Email: your.email@example.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/anonymous-confessions/issues)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

## 🔒 Privacy & Security

- No user data is collected beyond the confession content
- No IP addresses or identifying information is stored
- All submissions are treated as anonymous
- Tracking codes are randomly generated
- HTTPS recommended for production deployments

## 🐛 Known Issues

- None at the moment

## 🗺 Roadmap

- [ ] Add image upload functionality
- [ ] Implement admin dashboard
- [ ] Add comment/reply system
- [ ] Email notifications
- [ ] Rate limiting
- [ ] Advanced search and filtering
- [ ] Mobile app (React Native)

---

**Built with ❤️ using Node.js and Express**

⭐ **If you find this project useful, please give it a star!** ⭐


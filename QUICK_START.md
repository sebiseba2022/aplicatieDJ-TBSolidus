# 🚀 Carousel Party DJ - Quick Start Guide

## ✅ What's Been Created

Your complete Carousel Party DJ application is ready! Here's what was generated:

### Backend (Node.js + Express)
- ✅ Express server with CORS enabled
- ✅ MySQL database configuration
- ✅ RESTful API with 6 endpoints
- ✅ Error handling and connection pooling

### Frontend (React)
- ✅ Single Page Application with React Router
- ✅ Two pages: User Page and DJ Page
- ✅ Three reusable components
- ✅ Responsive styling
- ✅ axios for API calls

### Database (MySQL)
- ✅ Database schema with songs table
- ✅ Columns: id, name, active, likecount, dislikecount, timestamps
- ✅ Proper indexes and defaults

---

## 🎯 Quick Start (5 Steps)

### Step 1: Start XAMPP MySQL
- Open XAMPP Control Panel
- Click **Start** next to MySQL

### Step 2: Create Database
- Follow instructions in `SETUP_DATABASE.md`
- Or run setup.bat if on Windows

### Step 3: Install Dependencies
```bash
cd backend
npm install

cd ../frontend
npm install
```

### Step 4: Start Backend (Terminal 1)
```bash
cd backend
npm start
```
Backend runs on: `http://localhost:5000`

### Step 5: Start Frontend (Terminal 2)
```bash
cd frontend
npm start
```
Frontend opens at: `http://localhost:3000`

---

## 📱 Using the App

### User Page (`/user`)
1. Type a song name in the form
2. Click "Suggest" button
3. Song appears in the top 50 list
4. Vote with Like/Dislike buttons

### DJ Page (`/dj`)
1. See all suggested songs (sorted by likes)
2. Click "Move to Used" when you play a song
3. Used songs move to a separate section

---

## 🌐 Public Access with ngrok

See `NGROK_SETUP.md` for full instructions.

Quick version:
```bash
# Terminal 3 - Create tunnel
ngrok http 5000

# Update frontend/.env with ngrok URL
# Restart frontend
```

---

## 📁 Project Structure

```
caruselPartySolidus/
├── backend/                    # Node.js Express backend
│   ├── config/db.js           # MySQL connection
│   ├── routes/songs.js        # API endpoints
│   ├── server.js              # Main server file
│   ├── database.sql           # Database schema
│   ├── .env                   # Environment config
│   └── package.json
│
├── frontend/                   # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── SongForm.jsx
│   │   │   ├── SongsList.jsx
│   │   │   └── DJList.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── UserPage.jsx
│   │   │   └── DJPage.jsx
│   │   ├── App.jsx            # Router
│   │   ├── index.js           # Entry point
│   │   ├── App.css
│   │   └── index.css
│   ├── .env
│   └── package.json
│
├── README.md                   # Main documentation
├── SETUP_DATABASE.md          # Database setup guide
├── NGROK_SETUP.md             # ngrok configuration guide
├── QUICK_START.md             # This file
├── setup.bat                  # Windows setup script
└── .gitignore
```

---

## 🔌 API Reference

All endpoints are prefixed with `/api`:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/songs` | Get top 50 active songs |
| `GET` | `/songs/all` | Get all songs (DJ page) |
| `POST` | `/songs` | Add new song |
| `PUT` | `/songs/:id/like` | Increment likes |
| `PUT` | `/songs/:id/dislike` | Increment dislikes |
| `PUT` | `/songs/:id/move-used` | Mark as played |

---

## 🛠️ Environment Configuration

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=carousel_party_db
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

For ngrok, change to:
```
REACT_APP_API_URL=https://xxxx-xxxx-xxxx.ngrok.io/api
```

---

## ✨ Features

✅ **User Page**
- Suggest new songs via form
- Browse top 50 songs
- Vote with like/dislike
- Real-time vote counts

✅ **DJ Page**
- View all suggestions sorted by popularity
- See like/dislike counts
- Move played songs to used list
- Track playlist history

✅ **Public Access**
- Works with ngrok for external access
- Share links with party guests
- No authentication required (add in v2!)

---

## 📚 Documentation Files

- `README.md` - Full documentation
- `SETUP_DATABASE.md` - Database setup instructions
- `NGROK_SETUP.md` - Public access with ngrok
- `QUICK_START.md` - Quick reference (this file)

---

## 🎓 Tech Stack

**Backend:**
- Node.js 14+
- Express 4
- MySQL 5.7+
- body-parser, cors, dotenv

**Frontend:**
- React 18
- React Router 6
- axios
- CSS (no frameworks)

**Database:**
- MySQL (via XAMPP)
- 1 table: `songs`

---

## 💡 Tips

1. **Keep terminal windows open** - You need backend, frontend, and optionally ngrok running
2. **Refresh browser** - If something looks wrong, hard refresh (Ctrl+Shift+R)
3. **Check network tab** - Use Chrome DevTools to debug API calls
4. **Monitor console** - Look for errors in browser console and terminal
5. **ngrok status** - Check `http://127.0.0.1:4040` to see all requests

---

## ❓ Need Help?

1. **Backend won't start?** → Check SETUP_DATABASE.md
2. **Can't connect to database?** → Check XAMPP MySQL is running
3. **Frontend shows blank?** → Check browser console for errors
4. **ngrok not working?** → See NGROK_SETUP.md
5. **Can't find API?** → Check API endpoint in browser network tab

---

## 🎉 You're All Set!

Everything is ready to go. Follow the Quick Start steps above and enjoy your DJ app!

Questions? Check the documentation files or add features from the Future Enhancements list in README.md

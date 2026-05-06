# 🎵 Carousel Party DJ Application

A web application for managing DJ song requests at a carousel party with two pages:
- **User Page**: Suggest songs and vote (like/dislike) on suggested tracks
- **DJ Page**: Manage the playlist and move played songs to a "Used" list

## 📋 Requirements

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MySQL** (via XAMPP on port 3306)
- **ngrok** (for tunneling the backend to a public URL)

## 🚀 Quick Start

### 1. Database Setup (XAMPP)

Open XAMPP Control Panel and start **Apache** and **MySQL**.

Then, create the database:
1. Open phpMyAdmin (usually at `http://localhost/phpmyadmin`)
2. Go to **SQL** tab
3. Copy and paste the contents of `backend/database.sql`
4. Click **Execute**

Alternatively, from terminal:
```bash
mysql -u root < backend/database.sql
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Update `.env` if needed (default settings assume default XAMPP MySQL):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=carousel_party_db
PORT=5000
```

Start the backend:
```bash
npm start
```

The backend will be running on `http://localhost:5000`

### 3. Frontend Setup (in a new terminal)

```bash
cd frontend
npm install
npm start
```

The frontend will open automatically at `http://localhost:3000`

## 🌐 Exposing with ngrok

To access the application from outside your local network:

### 1. Install ngrok
```bash
npm install -g ngrok
```

### 2. Create ngrok tunnel for backend
In a new terminal:
```bash
ngrok http 5000
```

This will display a public URL like: `https://xxxx-xx-xxx-xxx-xx.ngrok.io`

### 3. Update frontend .env for ngrok
Edit `frontend/.env`:
```
REACT_APP_API_URL=https://xxxx-xx-xxx-xxx-xx.ngrok.io/api
```

Then restart the React dev server:
```bash
npm start
```

## 📱 Usage

### User Page (`/user`)
- Fill in the song name and click **Suggest**
- Songs appear in the list below (top 50, sorted by likes)
- Click **👍 Like** or **👎 Dislike** on any song

### DJ Page (`/dj`)
- View all suggested songs sorted by likes
- Click **Move to Used** to mark a song as played
- Used songs appear in a separate section below

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/songs` | Get top 50 active songs |
| GET | `/api/songs/all` | Get all songs (used by DJ page) |
| POST | `/api/songs` | Create a new song |
| PUT | `/api/songs/:id/like` | Increment like count |
| PUT | `/api/songs/:id/dislike` | Increment dislike count |
| PUT | `/api/songs/:id/move-used` | Mark song as used (set active=0) |

## 📁 Project Structure

```
caruselPartySolidus/
├── backend/
│   ├── config/
│   │   └── db.js              # MySQL connection pool
│   ├── routes/
│   │   └── songs.js           # API endpoints
│   ├── server.js              # Express app
│   ├── database.sql           # Database schema
│   ├── .env                   # Environment variables
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── SongForm.jsx   # Form to suggest songs
│   │   │   ├── SongsList.jsx  # Top 50 active songs list
│   │   │   └── DJList.jsx     # DJ control component
│   │   ├── pages/
│   │   │   ├── UserPage.jsx   # User page (form + list)
│   │   │   └── DJPage.jsx     # DJ page
│   │   ├── App.jsx            # Router setup
│   │   ├── index.js
│   │   ├── index.css
│   │   └── App.css
│   ├── .env                   # Frontend API URL
│   └── package.json
├── .gitignore
└── README.md
```

## 🛠️ Troubleshooting

### Backend won't start
- Check if MySQL is running in XAMPP
- Check if port 5000 is already in use
- Verify `.env` file has correct database credentials

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS is enabled in `server.js` (it is by default)
- If using ngrok, make sure you updated the frontend `.env`

### Database connection error
- Open XAMPP Control Panel and start MySQL
- Verify database `carousel_party_db` exists in phpMyAdmin
- Check `.env` credentials match your MySQL setup

## 🎯 Future Enhancements

- [ ] Authentication for DJ page
- [ ] Real-time updates (WebSockets)
- [ ] Song duration/artist fields
- [ ] Playlist export
- [ ] Music player integration
- [ ] Better UI/styling with Tailwind CSS

## 📝 License

This project is open source and available under the MIT License.

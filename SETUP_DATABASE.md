# 🗄️ Database Setup Guide

## Option 1: phpMyAdmin (Easiest)

1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Click **Start** next to Apache and MySQL

2. **Open phpMyAdmin**
   - Open browser and go to: `http://localhost/phpmyadmin`
   - You should see the phpMyAdmin interface

3. **Create Database**
   - Click on **SQL** tab at the top
   - Copy and paste the entire contents of `backend/database.sql`:
   ```sql
   CREATE DATABASE IF NOT EXISTS carousel_party_db;
   
   USE carousel_party_db;
   
   CREATE TABLE IF NOT EXISTS songs (
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     active TINYINT DEFAULT 1,
     likecount INT DEFAULT 0,
     dislikecount INT DEFAULT 0,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```
   - Click **Go** or **Execute**
   - You should see: "1 table(s) have been created successfully"

4. **Verify**
   - In the left panel under "carousel_party_db", you should see the "songs" table

---

## Option 2: Command Line

1. **Start XAMPP MySQL** (if not already running)

2. **Open Command Prompt** and run:
   ```bash
   cd c:\xampp\mysql\bin
   mysql -u root < "c:\Users\chitu\Desktop\caruselPartySolidus\backend\database.sql"
   ```

3. **Verify the database was created**:
   ```bash
   mysql -u root carousel_party_db -e "SHOW TABLES;"
   ```
   You should see the `songs` table listed.

---

## Option 3: Using phpMyAdmin SQL Upload (Alternative)

1. Open phpMyAdmin (`http://localhost/phpmyadmin`)
2. Click **Import** tab
3. Choose file: `backend/database.sql`
4. Click **Go**

---

## ✅ After Database Setup

Once the database is created, you can:

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Start the backend:
   ```bash
   npm start
   ```

3. In a new terminal, install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Start the frontend:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

---

## 🔧 Database Credentials

The default credentials in `.env` are:
- **Host**: localhost
- **User**: root
- **Password**: (empty)
- **Database**: carousel_party_db
- **Port**: 3306

If your XAMPP MySQL uses different credentials, update `backend/.env` accordingly.

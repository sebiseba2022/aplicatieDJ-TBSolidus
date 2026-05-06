# 🌐 ngrok Setup Guide

This guide will help you expose your application to the internet using ngrok.

## What is ngrok?

ngrok creates a secure tunnel to your localhost, giving you a public URL to access your application from anywhere.

## Prerequisites

- Node.js and npm installed
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`

---

## 📦 Installation

### Option 1: Global Installation (Recommended)

```bash
npm install -g ngrok
```

### Option 2: Per-Project Installation

```bash
npm install ngrok
```

---

## 🚀 Using ngrok

### 1. Start Your Backend and Frontend Normally

Terminal 1 - Backend:
```bash
cd backend
npm start
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### 2. Create ngrok Tunnel for Backend

Terminal 3:
```bash
ngrok http 5000
```

You'll see output like:
```
ngrok by @inconshreveable                                    (Ctrl+C to quit)

Session Status                online
Session Expires               1 hour, 59 minutes
Version                       3.1.0
Region                        us (United States)
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://xxxx-xx-xxx-xxx-xx.ngrok.io -> http://localhost:5000
```

Copy the **Forwarding URL** (e.g., `https://xxxx-xx-xxx-xxx-xx.ngrok.io`)

### 3. Update Frontend Environment Variable

Edit `frontend/.env`:
```
REACT_APP_API_URL=https://xxxx-xx-xxx-xxx-xx.ngrok.io/api
```

Replace `xxxx-xx-xxx-xxx-xx` with your actual ngrok URL.

### 4. Restart Frontend

Stop the frontend dev server (Ctrl+C) and run:
```bash
npm start
```

---

## 📱 Access from Other Devices

Now you can access your app from any device using:
- **User Page**: `http://localhost:3000` (local)
- **Public Access**: Share the ngrok backend URL with your DJ page users

---

## 🔧 Advanced Options

### Custom Subdomain (Requires Pro Account)

```bash
ngrok http -subdomain=mycarouselparty 5000
```

This gives you a static URL like: `https://mycarouselparty.ngrok.io`

### Tunneling Frontend Too (Optional)

If you want to also tunnel the frontend:

Terminal 3:
```bash
ngrok http 5000
```

Terminal 4:
```bash
ngrok http 3000
```

Then use both URLs as needed.

---

## 🔐 Security Notes

1. **ngrok URLs are public** - Don't share them publicly if sensitive data is involved
2. **Default rate limiting** - Free tier has some rate limits
3. **Session timeout** - Free tier URLs expire when ngrok closes
4. **Authentication** (Pro feature) - Can add password protection to ngrok tunnels

For this DJ app, you might want to add password protection to the DJ page endpoint in future versions.

---

## ❓ Troubleshooting

### "command not found: ngrok"
- Make sure ngrok was installed globally: `npm install -g ngrok`
- Or run: `npx ngrok http 5000`

### "Address already in use"
- Port 5000 or 3000 is already in use
- Change port in `.env` or `server.js` and update ngrok command

### "ERR_NAME_NOT_RESOLVED" in frontend
- Make sure you updated `frontend/.env` with the correct ngrok URL
- Make sure you restarted the frontend dev server

### Frontend can connect to backend locally but not via ngrok
- Check ngrok tunnel status at `http://127.0.0.1:4040`
- Verify the ngrok URL is accessible from a browser
- Try accessing the API endpoint directly: `https://xxxx.ngrok.io/api/songs`

---

## 📊 Monitoring

Open ngrok Web Interface at: `http://127.0.0.1:4040`

Here you can:
- See all requests to your backend
- Inspect request/response details
- Test endpoints
- Replay requests

This is very useful for debugging!

---

## 🎯 Next Steps

1. Set up the ngrok tunnel
2. Share the frontend URL with your party guests
3. They can suggest songs and vote via the public link
4. You (the DJ) access the DJ control page to manage the playlist

# 🚀 SyncED Production Deployment Guide

This guide provides step-by-step instructions for deploying the SyncED full-stack application to production.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Frontend Deployment (Vercel/Netlify)](#frontend-deployment-vercelnetlify)
5. [Environment Variables Reference](#environment-variables-reference)
6. [Testing the Deployment](#testing-the-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ MongoDB Atlas account
- ✅ Render account (for backend)
- ✅ Vercel or Netlify account (for frontend)
- ✅ Git installed locally

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create a MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Sign in or create a new account
3. Click **"Build a Database"**
4. Choose **M0 Free Tier** (or appropriate tier)
5. Select your preferred cloud provider and region
6. Name your cluster (e.g., `synced-cluster`)
7. Click **"Create Cluster"**

### Step 2: Configure Database Access

1. Go to **Database Access** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Username: `synced_user` (or your choice)
5. Generate a strong password (save it securely)
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

### Step 3: Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access From Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, restrict to your Render IP addresses
4. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **Database** in the left sidebar
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"**
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your credentials
6. Add `/synced_db` before the `?` to specify the database:
   ```
   mongodb+srv://synced_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/synced_db?retryWrites=true&w=majority
   ```

---

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. Ensure `.env` files are in `.gitignore`
2. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

### Step 2: Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `synced-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend` (if backend is in a subdirectory)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free (or appropriate tier)

### Step 3: Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

```plaintext
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://synced_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/synced_db?retryWrites=true&w=majority
CLIENT_URL=https://your-frontend.vercel.app
JWT_SECRET=<generate-a-strong-random-secret>
```

**To generate a secure JWT_SECRET**, run locally:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)
3. Your backend will be available at: `https://synced-backend.onrender.com`

### Step 5: Verify Backend

Test your backend API:
```bash
curl https://synced-backend.onrender.com/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-15T...",
  "uptime": 123.456,
  "environment": "production"
}
```

---

## 🌐 Frontend Deployment (Vercel/Netlify)

### Option A: Vercel Deployment

#### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

#### Step 2: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (or leave empty if frontend is at root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### Step 3: Set Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Add:
   ```plaintext
   VITE_API_URL=https://synced-backend.onrender.com
   ```
3. Apply to **Production**, **Preview**, and **Development** environments

#### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete
3. Your frontend will be available at: `https://your-app.vercel.app`

### Option B: Netlify Deployment

#### Step 1: Deploy via Netlify Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Base directory**: (leave empty or set to frontend folder)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### Step 2: Set Environment Variables

1. Go to **Site settings** → **Environment variables**
2. Add:
   ```plaintext
   VITE_API_URL=https://synced-backend.onrender.com
   ```

#### Step 3: Deploy
1. Click **"Deploy site"**
2. Wait for build to complete
3. Your frontend will be available at: `https://your-app.netlify.app`

---

## 🔄 Update Backend CORS

After deploying frontend, update backend environment variables on Render:

1. Go to Render Dashboard → Your Web Service
2. Environment → Edit `CLIENT_URL`
3. Change to your actual frontend URL:
   ```
   CLIENT_URL=https://your-app.vercel.app
   ```
   Or multiple URLs (comma-separated):
   ```
   CLIENT_URL=https://your-app.vercel.app,https://your-app.netlify.app
   ```
4. Save → Render will automatically redeploy

---

## 📝 Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `production` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `CLIENT_URL` | Allowed CORS origins | `https://your-app.vercel.app` |
| `JWT_SECRET` | JWT signing secret | `<64-char-hex-string>` |

### Frontend (.env.production)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://synced-backend.onrender.com` |

---

## ✅ Testing the Deployment

### 1. Test Backend Health
```bash
curl https://synced-backend.onrender.com/health
```

### 2. Test API Endpoints
```bash
# Test authentication endpoint
curl -X POST https://synced-backend.onrender.com/api/auth/student/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 3. Test Frontend
1. Open your deployed frontend URL
2. Open browser DevTools → Network tab
3. Perform login or data fetch
4. Verify API calls go to correct backend URL
5. Check for CORS errors (should be none)

### 4. Verify Database Connection
1. Go to MongoDB Atlas Dashboard
2. Click **"Browse Collections"**
3. Check if `synced_db` database exists
4. Verify data is being written after API calls

---

## 🐛 Troubleshooting

### CORS Errors

**Problem**: `Access to fetch has been blocked by CORS policy`

**Solution**:
1. Verify `CLIENT_URL` in Render includes your frontend URL
2. Ensure no trailing slashes in URLs
3. Check Render logs for CORS warnings

### MongoDB Connection Failed

**Problem**: `MongoServerError: bad auth : Authentication failed`

**Solution**:
1. Verify username/password in connection string
2. Check MongoDB Atlas Network Access allows Render IPs
3. Ensure database name is specified in URI

### Environment Variables Not Loading

**Problem**: API returns 500 error, logs show "MONGO_URI is not defined"

**Solution**:
1. Verify environment variables are set in Render dashboard
2. Click "Manual Deploy" to redeploy with new env vars
3. Check for typos in variable names

### Build Failures on Vercel/Netlify

**Problem**: Build fails with "process is not defined"

**Solution**:
1. Ensure you're using `import.meta.env.VITE_API_URL` (not `process.env`)
2. Verify `.env.production` exists with `VITE_API_URL`
3. Clear build cache and redeploy

### API Requests Timeout

**Problem**: Frontend requests hang or timeout

**Solution**:
1. Check Render service is running (not sleeping)
2. Verify `VITE_API_URL` includes full URL (with https://)
3. Check Render logs for errors

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## 🔒 Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use strong, randomly generated JWT secrets
3. ✅ Restrict MongoDB network access in production
4. ✅ Use HTTPS for all connections
5. ✅ Regularly rotate database credentials
6. ✅ Monitor API logs for suspicious activity
7. ✅ Implement rate limiting on sensitive endpoints
8. ✅ Keep dependencies updated

---

## 🎉 Success Checklist

- [ ] MongoDB Atlas cluster created and accessible
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel/Netlify
- [ ] Environment variables configured correctly
- [ ] CORS working (no errors in browser console)
- [ ] API endpoints responding correctly
- [ ] Data persisting in MongoDB Atlas
- [ ] All .env files added to .gitignore
- [ ] Production URLs documented

---

**Need help?** Check the troubleshooting section or contact the development team.

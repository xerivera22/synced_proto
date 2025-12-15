# Render Environment Variables Setup

Configure these environment variables in your Render service dashboard:

## Steps to Configure Render

1. **Go to your Render dashboard:**
   - Visit: https://dashboard.render.com
   - Select your `synced-proto` backend service

2. **Navigate to Environment tab**

3. **Add/Update the following variables:**

### Required Variables

```
NODE_ENV=production
```

```
PORT=5000
```

(Leave empty or use 5000 - Render will auto-assign if empty)

```
MONGO_URI=mongodb+srv://xherds_db:FJCZ81lBL8Pqv4Xx@cluster0.1quxa6p.mongodb.net/synced_db
```

(Your MongoDB Atlas connection string)

```
CLIENT_URL=https://synced-seven.vercel.app
```

(Your Vercel frontend URL for CORS)

```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

(Generate a secure random string for production)

4. **Save Changes**
   - Render will automatically redeploy after saving environment variables

## Security Notes

⚠️ **IMPORTANT:**

- Never commit `.env` files to GitHub
- The `.env` file is in `.gitignore` for security
- Only set environment variables through Render's dashboard
- Generate a strong JWT_SECRET (recommended: 64+ random characters)

## Generate Secure JWT_SECRET

Run this command locally to generate a secure secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Then copy the output and use it as your JWT_SECRET in Render.

## Verification

After deployment:

1. Check Render logs for successful startup
2. Test health endpoint: `curl https://synced-proto.onrender.com/health`
3. Test root endpoint: `curl https://synced-proto.onrender.com/`
4. Verify CORS allows your Vercel URL

## Current Configuration

Based on your current setup:

- Backend URL: `https://synced-proto.onrender.com`
- Frontend URL: `https://synced-seven.vercel.app`
- MongoDB: Atlas cluster (synced_db)

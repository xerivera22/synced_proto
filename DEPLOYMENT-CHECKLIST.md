# ✅ SyncED Production Deployment Checklist

Use this checklist to ensure a smooth, secure production deployment.

---

## 📋 Pre-Deployment Checklist

### Code Quality

- [ ] All TypeScript/ESLint errors resolved
- [ ] Console.log statements removed (or wrapped in development checks)
- [ ] No hardcoded credentials in source code
- [ ] All API endpoints tested locally
- [ ] Error handling implemented on all routes
- [ ] Loading states implemented in UI

### Environment Configuration

- [ ] `.env` files added to `.gitignore`
- [ ] `.env.example` files created with placeholders
- [ ] All required environment variables documented
- [ ] Production-ready values generated (JWT secrets, etc.)

### Security

- [ ] Strong passwords generated for database users
- [ ] JWT secrets are cryptographically secure (64+ bytes)
- [ ] CORS configured with specific origins (no wildcards)
- [ ] API rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL/NoSQL injection prevention verified
- [ ] XSS protection enabled

### Database

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with appropriate permissions
- [ ] Network access configured (IP whitelist)
- [ ] Connection string tested locally
- [ ] Database name explicitly specified in URI
- [ ] Indexes created for frequently queried fields

---

## 🗄️ MongoDB Atlas Setup

### Account & Cluster

- [ ] MongoDB Atlas account created
- [ ] M0 (Free) or paid cluster provisioned
- [ ] Cluster region selected (close to users)
- [ ] Cluster accessible (not hibernating)

### Security

- [ ] Database user created: `synced_user`
- [ ] Strong password generated and saved securely
- [ ] User has `readWrite` role on `synced_db`
- [ ] Network Access: `0.0.0.0/0` added (or specific IPs)
- [ ] Audit logs enabled (if available)

### Connection

- [ ] Connection string copied
- [ ] Username/password inserted correctly
- [ ] Database name added: `/synced_db?`
- [ ] Query parameters preserved: `?retryWrites=true&w=majority`
- [ ] Connection tested with MongoDB Compass or mongosh

### Final Connection String Format
```
mongodb+srv://synced_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/synced_db?retryWrites=true&w=majority
```

---

## 🖥️ Backend Deployment (Render)

### Repository Preparation

- [ ] Code pushed to GitHub main branch
- [ ] `.env` file NOT in repository
- [ ] `backend/.gitignore` includes `.env`
- [ ] `package.json` scripts configured:
  - [ ] `"start": "nodemon server.js"`
  - [ ] `"prod": "NODE_ENV=production node server.js"`

### Render Service Creation

- [ ] Render account created
- [ ] New Web Service created
- [ ] GitHub repository connected
- [ ] Service configured:
  - **Name**: `synced-backend`
  - **Environment**: Node
  - **Build Command**: `cd backend && npm install`
  - **Start Command**: `cd backend && npm run prod`
  - **Branch**: `main`

### Environment Variables

Add in Render Dashboard → Environment:

- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`
- [ ] `MONGO_URI=mongodb+srv://synced_user:PASSWORD@...`
- [ ] `CLIENT_URL=https://your-frontend.vercel.app`
- [ ] `JWT_SECRET=<64-char-hex-string>`

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Deployment

- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Check logs for errors
- [ ] Note backend URL: `https://synced-backend.onrender.com`

### Verification

- [ ] Health endpoint responds: `/health`
  ```bash
  curl https://synced-backend.onrender.com/health
  ```
- [ ] MongoDB connection successful (check logs)
- [ ] CORS headers present in response
- [ ] No errors in Render logs

---

## 🌐 Frontend Deployment (Vercel)

### Repository Preparation

- [ ] `.env` file NOT in repository
- [ ] `.gitignore` includes `.env*` (except `.env.example`)
- [ ] `.env.production` created with production backend URL

### Vercel Project Setup

- [ ] Vercel account created
- [ ] New project created
- [ ] GitHub repository connected
- [ ] Framework detected: Vite
- [ ] Build settings verified:
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`
  - **Install Command**: `npm install`

### Environment Variables

Add in Vercel → Settings → Environment Variables:

- [ ] **Key**: `VITE_API_URL`
- [ ] **Value**: `https://synced-backend.onrender.com`
- [ ] Applied to: **Production**, **Preview**, **Development**

### Deployment

- [ ] Click "Deploy"
- [ ] Wait for build (2-5 minutes)
- [ ] Check build logs for errors
- [ ] Note frontend URL: `https://synced.vercel.app`

### Verification

- [ ] Frontend loads without errors
- [ ] API calls go to correct backend URL (check Network tab)
- [ ] No CORS errors in browser console
- [ ] Authentication works
- [ ] Data displays correctly

---

## 🔄 Post-Deployment Configuration

### Update Backend CORS

Now that you have the frontend URL:

- [ ] Go to Render → synced-backend → Environment
- [ ] Update `CLIENT_URL=https://synced.vercel.app`
- [ ] Save changes
- [ ] Wait for automatic redeploy

### Custom Domain (Optional)

**Vercel:**
- [ ] Add custom domain in Vercel project settings
- [ ] Configure DNS records at domain registrar
- [ ] Wait for SSL certificate provisioning

**Render:**
- [ ] Add custom domain in Render service settings
- [ ] Configure CNAME record at domain registrar
- [ ] Verify domain ownership

---

## 🧪 Production Testing

### Functional Tests

- [ ] User registration works
- [ ] User login works (all roles)
- [ ] CRUD operations work (create, read, update, delete)
- [ ] Search functionality works
- [ ] Pagination works
- [ ] File uploads work (if applicable)
- [ ] Email notifications sent (if applicable)

### Performance Tests

- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] No memory leaks in long sessions
- [ ] Images optimized and loading fast

### Security Tests

- [ ] HTTPS enforced (no HTTP)
- [ ] Authentication required on protected routes
- [ ] Authorization checked (role-based access)
- [ ] CORS working correctly
- [ ] No sensitive data in browser console
- [ ] No API keys exposed in frontend code

### Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring

- [ ] MongoDB Atlas alerts configured:
  - [ ] High connection count
  - [ ] Low disk space
  - [ ] Replication lag
- [ ] Render monitoring enabled:
  - [ ] Service health checks
  - [ ] Error rate alerts
- [ ] Vercel monitoring enabled:
  - [ ] Build failure notifications
  - [ ] Domain SSL expiry alerts

### Backup Strategy

- [ ] MongoDB Atlas backups enabled (if not M0)
- [ ] Database backup schedule configured
- [ ] Backup restoration tested
- [ ] Environment variables documented securely

### Documentation

- [ ] Production URLs documented
- [ ] Environment variables documented (without values)
- [ ] Deployment process documented
- [ ] Troubleshooting guide created
- [ ] Team members have access to:
  - [ ] MongoDB Atlas
  - [ ] Render dashboard
  - [ ] Vercel dashboard
  - [ ] GitHub repository

---

## 🚨 Emergency Procedures

### Rollback Plan

If something goes wrong:

**Vercel:**
- [ ] Go to Deployments tab
- [ ] Find last working deployment
- [ ] Click "Promote to Production"

**Render:**
- [ ] Manual rollback not available
- [ ] Revert code changes in GitHub
- [ ] Trigger manual deploy

### Incident Response

- [ ] Incident response team identified
- [ ] Communication channels established
- [ ] Escalation procedures documented
- [ ] Postmortem process defined

---

## ✅ Final Sign-Off

### Pre-Launch Review

- [ ] All checklist items completed
- [ ] Stakeholders notified of launch
- [ ] Support team briefed
- [ ] Monitoring dashboards set up
- [ ] Backup contacts available

### Launch Day

- [ ] Monitor error rates closely
- [ ] Check database performance
- [ ] Watch API response times
- [ ] Track user feedback
- [ ] Be available for issues

### Post-Launch (24 Hours)

- [ ] Review error logs
- [ ] Check database growth
- [ ] Monitor API usage patterns
- [ ] Collect user feedback
- [ ] Plan hotfixes if needed

---

## 🎉 Deployment Complete!

**Signed off by:**

- **Developer**: _________________ Date: _______
- **Tech Lead**: _________________ Date: _______
- **Project Manager**: ___________ Date: _______

**Production URLs:**

- Frontend: _________________________________
- Backend: __________________________________
- Database: MongoDB Atlas

**Emergency Contacts:**

- On-call engineer: _________________________
- Database admin: ___________________________
- DevOps lead: _____________________________

---

**🚀 Ready for launch!**

# 🔒 SyncED Security & Environment Configuration Guide

This document provides comprehensive security guidelines and environment variable management for the SyncED application.

---

## 📋 Table of Contents

1. [Why .env Files Are NOT Pushed to GitHub](#why-env-files-are-not-pushed-to-github)
2. [Environment Variable Management](#environment-variable-management)
3. [Security Best Practices](#security-best-practices)
4. [Recreating Environment Variables](#recreating-environment-variables)
5. [MongoDB Atlas Security](#mongodb-atlas-security)
6. [API Key Management](#api-key-management)
7. [Emergency Procedures](#emergency-procedures)

---

## 🚨 Why .env Files Are NOT Pushed to GitHub

### Critical Reasons

1. **Credential Exposure**
   - `.env` files contain sensitive credentials (database passwords, API keys, secrets)
   - Public GitHub repos expose these to the entire internet
   - Even private repos can be compromised through:
     - Former employees with access
     - Accidental public visibility changes
     - GitHub security breaches
     - Third-party integrations

2. **Security Vulnerabilities**
   - Exposed credentials enable unauthorized access to:
     - Your database (read/write/delete all data)
     - Your APIs (impersonate your application)
     - Your infrastructure (potential system takeover)
   - Automated bots scan GitHub for exposed credentials 24/7

3. **Different Environments**
   - Development uses different credentials than production
   - Each developer may have their own local database
   - Hardcoding values prevents environment-specific configuration

4. **Compliance & Legal Issues**
   - Many regulations (GDPR, HIPAA, PCI-DSS) require proper credential management
   - Exposed credentials can result in:
     - Data breaches
     - Legal liability
     - Financial penalties
     - Loss of customer trust

### What Happens If You Commit .env Files?

```bash
# Even if you delete the .env file later, it remains in Git history!
git log --all --full-history -- "*.env"
```

**Solution: If this happens:**
1. Immediately rotate ALL credentials in the exposed `.env`
2. Use `git-filter-repo` or BFG Repo-Cleaner to remove from history
3. Force push the cleaned repository
4. Notify your team about the incident

---

## 🔧 Environment Variable Management

### Local Development

#### 1. Initial Setup

```bash
# Clone repository
git clone https://github.com/yourusername/synced_proto.git
cd synced_proto

# Backend setup
cd backend
cp .env.example .env
# Edit .env with your actual values
nano .env  # or use any text editor

# Frontend setup
cd ..
cp .env.example .env
nano .env
```

#### 2. .gitignore Configuration

Your `.gitignore` MUST include:

```gitignore
# Environment Variables - NEVER COMMIT
.env
.env.*
!.env.example
.env.local
.env.development
.env.production
.env.test

# Sensitive Files
*.pem
*.key
*.cert
config/secrets.json
```

#### 3. Verify .env is Ignored

```bash
# Check if .env is being tracked
git status

# If .env appears, it's NOT being ignored!
# Fix: Ensure it's in .gitignore and run:
git rm --cached .env
git rm --cached backend/.env
```

### Production Deployment

#### Render (Backend)

1. **Go to your Web Service** → **Environment**
2. **Click "Add Environment Variable"**
3. **Add each variable individually:**
   ```
   Key: NODE_ENV          Value: production
   Key: PORT              Value: 5000
   Key: MONGO_URI         Value: mongodb+srv://...
   Key: CLIENT_URL        Value: https://your-app.vercel.app
   Key: JWT_SECRET        Value: <generate-secure-secret>
   ```
4. **Save Changes** → Render automatically redeploys

#### Vercel (Frontend)

1. **Go to Project Settings** → **Environment Variables**
2. **Add variable:**
   ```
   Key: VITE_API_URL
   Value: https://your-backend.onrender.com
   ```
3. **Select environments:** Production, Preview, Development
4. **Save** → Redeploy if needed

#### Netlify (Frontend)

1. **Site Settings** → **Environment Variables**
2. **New Variable:**
   ```
   Key: VITE_API_URL
   Value: https://your-backend.onrender.com
   ```
3. **Save** → Trigger new deploy

---

## 🔐 Security Best Practices

### 1. Generate Strong Secrets

#### JWT Secret Generation
```bash
# Node.js method (64 bytes = 128 hex characters)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# OpenSSL method
openssl rand -hex 64

# Example output (DO NOT USE THIS):
# a1b2c3d4e5f6...7890abcdef
```

#### MongoDB Password Requirements
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, special characters
- Avoid dictionary words
- Use password manager (1Password, LastPass, Bitwarden)

### 2. Rotate Credentials Regularly

**Recommended Schedule:**
- JWT Secrets: Every 3 months
- Database Passwords: Every 6 months
- API Keys: When team member leaves or security incident

**Rotation Process:**
1. Generate new credential
2. Update production environment variables
3. Update development environment variables
4. Update team documentation
5. Revoke old credential after grace period

### 3. Access Control

#### MongoDB Atlas
```
✅ Network Access: Restrict to specific IPs
✅ Database Users: Create role-based users
✅ Audit Logs: Enable for production
✅ Encryption: Enable encryption at rest
```

#### GitHub Repository
```
✅ Protected branches: Require PR reviews
✅ Branch protection: Prevent force pushes
✅ Secret scanning: Enable GitHub secret scanning
✅ Dependabot: Enable security updates
```

### 4. Environment Separation

| Environment | Purpose | Database | API Keys |
|-------------|---------|----------|----------|
| **Development** | Local coding | Local/Dev DB | Test keys |
| **Staging** | Pre-production testing | Staging DB | Test keys |
| **Production** | Live application | Production DB | Live keys |

**Never mix environments!**

---

## 🔄 Recreating Environment Variables

### Scenario: New Team Member Onboarding

1. **Share `.env.example` files** (these are safe, no actual values)
2. **Provide secure credential access:**
   ```bash
   # Option A: Use secure password manager
   # Share 1Password vault with team member
   
   # Option B: Encrypted file transfer
   # Create encrypted archive
   tar -czf env-vars.tar.gz backend/.env .env
   openssl enc -aes-256-cbc -salt -in env-vars.tar.gz -out env-vars.tar.gz.enc
   # Share encryption password via phone/separate channel
   ```
3. **Team member decrypts and sets up locally:**
   ```bash
   openssl enc -d -aes-256-cbc -in env-vars.tar.gz.enc -out env-vars.tar.gz
   tar -xzf env-vars.tar.gz
   ```

### Scenario: Moving to New Deployment Platform

1. **Export existing environment variables:**
   ```bash
   # From Render dashboard, document all variables
   # Or use Render CLI
   render env list --service=your-service-name
   ```

2. **Import to new platform:**
   - Vercel: Use Vercel CLI
     ```bash
     vercel env add VITE_API_URL production
     ```
   - Netlify: Use Netlify CLI
     ```bash
     netlify env:set VITE_API_URL "https://..."
     ```

---

## 🗄️ MongoDB Atlas Security

### Initial Configuration

1. **Enable IP Whitelist**
   ```
   ✅ Development: Add your IP
   ✅ Production: Add Render IP ranges
   ✅ Monitoring: Add monitoring service IPs
   ✅ Team: Add VPN IP if applicable
   ```

2. **Create Dedicated Database Users**
   ```javascript
   // Admin user (full access, use sparingly)
   username: admin_user
   role: readWriteAnyDatabase
   
   // Application user (restricted to synced_db)
   username: synced_app
   role: readWrite
   database: synced_db
   ```

3. **Enable Audit Logging**
   - Go to Atlas Dashboard → Security → Audit Log
   - Enable for tracking all database operations

4. **Verify Data Privacy**
   ```
   ✅ Encryption at rest: Enabled
   ✅ Encryption in transit: TLS/SSL
   ✅ Backup encryption: Enabled
   ✅ Access logs: Monitored
   ```

### Connection String Security

❌ **NEVER do this:**
```javascript
// DON'T HARDCODE IN SOURCE CODE
mongoose.connect('mongodb+srv://user:password@cluster.mongodb.net/db');
```

✅ **ALWAYS do this:**
```javascript
// USE ENVIRONMENT VARIABLES
mongoose.connect(process.env.MONGO_URI);
```

---

## 🔑 API Key Management

### For Third-Party Services (Stripe, SendGrid, etc.)

1. **Store in environment variables:**
   ```bash
   # Backend .env
   STRIPE_SECRET_KEY=sk_test_...
   SENDGRID_API_KEY=SG....
   ```

2. **Never expose in frontend:**
   ```javascript
   // ❌ BAD - API key visible in browser
   const stripe = Stripe('pk_live_...');  // DON'T PUT LIVE KEY
   
   // ✅ GOOD - Use test key or server-side only
   const stripe = Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
   ```

3. **Use different keys per environment:**
   - Development: Test/Sandbox keys
   - Production: Live/Production keys

---

## 🚨 Emergency Procedures

### If Credentials Are Compromised

1. **Immediate Actions (Within 5 minutes):**
   ```bash
   # Rotate MongoDB password
   1. Log into MongoDB Atlas
   2. Database Access → Edit User → Change Password
   3. Update MONGO_URI in Render
   
   # Rotate JWT secret
   1. Generate new secret: openssl rand -hex 64
   2. Update JWT_SECRET in Render
   3. All users will need to re-login
   ```

2. **Investigation (Within 1 hour):**
   - Check MongoDB Atlas audit logs for unauthorized access
   - Review server logs for suspicious API requests
   - Check GitHub commit history for exposure point
   - Scan repository with TruffleHog or GitGuardian

3. **Remediation (Within 24 hours):**
   - Remove exposed credentials from Git history
   - Notify affected users if data breach occurred
   - Document incident and prevention measures
   - Update security procedures

### Contact List

```
Security Lead: [email]
Database Admin: [email]
DevOps Lead: [email]
Emergency Hotline: [phone]
```

---

## ✅ Security Checklist

### Before Each Deployment

- [ ] All `.env` files listed in `.gitignore`
- [ ] No credentials hardcoded in source code
- [ ] All environment variables set in deployment platform
- [ ] MongoDB network access restricted
- [ ] CORS properly configured
- [ ] HTTPS enforced on all endpoints
- [ ] Dependencies updated (no known vulnerabilities)
- [ ] Error messages don't expose sensitive info
- [ ] API rate limiting implemented
- [ ] Logging configured (but not logging secrets)

### Monthly Security Review

- [ ] Review MongoDB Atlas access logs
- [ ] Check for security updates in dependencies
- [ ] Verify IP whitelist is current
- [ ] Test backup restoration process
- [ ] Review API usage for anomalies
- [ ] Update secrets if team member left

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [Twelve-Factor App Methodology](https://12factor.net/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)

---

**Remember: Security is not a one-time setup, it's an ongoing process!**

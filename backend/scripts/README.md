# Database Seeding Scripts

This directory contains scripts to populate the database with initial data.

## Available Scripts

### Seed Admin User

Creates a default admin user for accessing the admin dashboard.

**Command:**
```bash
npm run seed:admin
```

**Default Credentials:**
- **Email:** `schooladmin123@gmail.com`
- **Password:** `synced_admin`
- **Role:** `admin`

**Security Features:**
- Password is automatically hashed using bcrypt before storage
- Email uniqueness is enforced - script won't create duplicates
- Safe to run multiple times (idempotent)

**Production Recommendation:**
⚠️ After first login, immediately change the default password through the admin dashboard.

## Usage

### Local Development
```bash
cd backend
npm run seed:admin
```

### Production (Render)
You can run this script once after deployment using Render's shell:
1. Go to your Render service dashboard
2. Click "Shell" tab
3. Run: `npm run seed:admin`

## Notes

- All seed scripts require proper MongoDB connection (MONGO_URI in .env)
- Scripts will exit gracefully if data already exists
- Check console output for detailed status messages

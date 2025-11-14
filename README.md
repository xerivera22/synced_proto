# 🚀 SyncED - React TypeScript Application

**Modern school management platform built with React, TypeScript, and Tailwind CSS**

---

<!-- ...existing code... -->

### 📁 Project Structure (detailed)

```
syncproto landing/          # Root
├─ src/                     # TypeScript React source
│  ├─ App.tsx               # Routes
│  ├─ main.tsx              # Entry
│  ├─ index.css             # Tailwind base/styles
│  ├─ context/
│  │  └─ AuthContext.tsx    # Auth + roles (admin/student/teacher/parent)
│  ├─ types/
│  │  └─ index.ts           # Global TS types (Plan, User, etc.)
│  ├─ components/           # Reusable UI
│  │  ├─ Navbar.tsx
│  │  ├─ Footer.tsx
│  │  └─ ScrollToTop.tsx
│  ├─ pages/
│  │  ├─ landing/                   # Public + auth pages (converted from HTML)
│  │  │  ├─ LandingPage.tsx         # ← was index.html
│  │  │  ├─ PricingPage.tsx         # ← was pricing.html
│  │  │  ├─ RegisterPage.tsx        # ← was register.html
│  │  │  ├─ RegisterFormPage.tsx    # ← was register-form.html
│  │  │  ├─ AdminLoginPage.tsx      # ← was advisor-login.html
│  │  │  ├─ StudentLoginPage.tsx    # ← was student-login.html (also Parent)
│  │  │  └─ (Teacher login removed; use Admin login)
│  │  ├─ admin/
│  │  │  └─ AdminDashboardPage.tsx  # ← was advisor.html
│  │  ├─ student/
│  │  │  ├─ StudentDashboardPage.tsx      # ← was student-dashboard.html
│  │  │  └─ components/
│  │  │     ├─ dashboard.tsx              # Overview (quick stats, announcements)
│  │  │     ├─ schedule.tsx               # Schedule tab (KPI tiles + list)
│  │  │     ├─ attendance.tsx             # Attendance tab (KPIs)
│  │  │     ├─ academic-progress.tsx      # Academic tab (KPIs)
│  │  │     └─ payment-status.tsx         # Payments tab (KPIs)
│  │  ├─ parent/
│  │  │  └─ ParentDashboardPage.tsx
│  │  └─ teacher/
│  │     ├─ TeacherDashboardPage.tsx
│  │     ├─ layout/
│  │     │  └─ TeacherShell.tsx
│  │     ├─ components/
│  │     │  └─ side-navigation.tsx
│  │     └─ screens/
│  │        ├─ subjects.tsx
│  │        ├─ subject-detail.tsx
│  │        ├─ attendance.tsx
│  │        ├─ schedule.tsx
│  │        ├─ profile.tsx
│  │        └─ settings.tsx
│  └─ assets/                # Images/icons (if any)
│
├─ public/
│  └─ syncED.png
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js
├─ vite.config.ts
└─ legacy *.html             # Old static files (safe to delete)
```

<!-- ...existing code... -->

---

## 🔑 Test Credentials

### Administrator
- **URL:** http://localhost:5173/admin-login
- **Email:** `admin@synced.com`
- **Password:** `admin123`
- If you enter teacher credentials here (`teacher@synced.com` / `teacher123`), you'll be logged in as a Teacher and redirected to the Teacher Dashboard automatically.

### Student/Parent
- **URL:** http://localhost:5173/student-login
- **Email:** `student@synced.com`
- **Password:** `student123`

### Parent
- **URL:** http://localhost:5173/parent-dashboard
- **Email:** `parent@synced.com`
- **Password:** `parent123`

### Teacher
- **Login via Admin page:** http://localhost:5173/admin-login
- **Email:** `teacher@synced.com`
- **Password:** `teacher123`
- After login, you'll be redirected to the Teacher Dashboard automatically.

---

### Type Safety
```typescript
// TypeScript catches errors at compile time!
interface User {
  email: string;
  role: 'admin' | 'student' | 'teacher';
}

const user: User = {
  email: 'admin@synced.com',
  role: 'admin' // Type-safe!
};
```
---

## 📖 Documentation

- **React:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/
- **Tailwind CSS:** https://tailwindcss.com/
- **Vite:** https://vitejs.dev/

---

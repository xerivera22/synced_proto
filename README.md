# 🚀 SyncED - React TypeScript Application

**Modern school management platform built with React, TypeScript, and Tailwind CSS**

---

// ...existing code...

## Project Structure (updated)

```
synced_proto/
├─ src/
│  ├─ context/
│  ├─ components/
│  │  └─ shared/
│  ├─ pages/
│  │  ├─ admin/
│  │  │  ├─ layout/
│  │  │  │  └─ AdminShell.tsx
│  │  │  ├─ screens/
│  │  │  │  ├─ Dashboard.tsx
│  │  │  │  ├─ Students.tsx          # Tabbed: summary + detailed tables
│  │  │  │  ├─ Faculty.tsx
│  │  │  │  ├─ Events.tsx
│  │  │  │  ├─ Payments.tsx
│  │  │  │  ├─ Announcements.tsx
│  │  │  │  └─ Settings.tsx
│  │  │  ├─ data/
│  │  │  │  └─ mockData.ts           # Mock datasets (students, faculty, finance, events, announcements)
│  │  │  └─ (legacy AdminDashboardPage.tsx removed)
│  │  ├─ parent/
│  │  │  ├─ layout/
│  │  │  │  └─ ParentShell.tsx
│  │  │  ├─ screens/
│  │  │  │  ├─ overview.tsx
│  │  │  │  ├─ attendance.tsx
│  │  │  │  ├─ schedule.tsx
│  │  │  │  ├─ AcademicProgress.tsx
│  │  │  │  ├─ documents.tsx
│  │  │  │  └─ messages.tsx
│  │  │  └─ (legacy ParentDashboardPage.tsx removed)
│  │  ├─ teacher/
│  │  │  ├─ layout/
│  │  │  │  └─ TeacherShell.tsx
│  │  │  ├─ screens/
│  │  │  │  ├─ overview.tsx
│  │  │  │  ├─ attendance.tsx
│  │  │  │  ├─ schedule.tsx
│  │  │  │  └─ gradebook.tsx
│  │  │  └─ (legacy TeacherDashboardPage.tsx removed)
│  │  ├─ student/
│  │  │  ├─ components/
│  │  │  ├─ styles/
│  │  │  └─ screens/
│  │  ├─ App.tsx                      # Routes incl. /admin/*, /parent/*, /teacher/*
│  │  └─ index.tsx
│  ├─ assets/
│  ├─ hooks/
│  └─ utils/
├─ public/
├─ package.json
└─ README.md
```

### Admin Portal (Mock Phase)

- All admin pages consume `mockData.ts`.
- Legacy single-page dashboards removed; role shells handle navigation.
- Replace mocks with API integrations later (students, finance, events, announcements).

### Cleanup Notes

- Ensure routes for removed legacy pages are purged from `App.tsx`.
- Sidebar icon centering fixed across shells.
- Card tinting normalized (admin tables now neutral white).

### Next Steps

1. Add TypeScript interfaces for mock entities (Student, Invoice, Event).
2. Introduce service layer stubs (`src/services/`) to ease backend swap.
3. Address outstanding chart null guard in `student/components/ui/chart.tsx`.

// ...existing code...

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

- **URL:** http://localhost:5173/parent/overview
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
  role: "admin" | "student" | "teacher";
}

const user: User = {
  email: "admin@synced.com",
  role: "admin", // Type-safe!
};
```

---

## 📖 Documentation

- **React:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/
- **Tailwind CSS:** https://tailwindcss.com/
- **Vite:** https://vitejs.dev/

---

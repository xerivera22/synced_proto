import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Landing/public/auth pages grouped under pages/landing
import LandingPage from '@/pages/landing/LandingPage';
import PricingPage from '@/pages/landing/PricingPage';
import RegisterPage from '@/pages/landing/RegisterPage';
import RegisterFormPage from '@/pages/landing/RegisterFormPage';
import AdminLoginPage from '@/pages/landing/AdminLoginPage';
import StudentLoginPage from '@/pages/landing/StudentLoginPage';
// Dashboards remain at root pages for now; will be reorganized later
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import StudentShell from '@/pages/student/layout/StudentShell';
import { Overview, AcademicProgress, Attendance, Payments, Profile, Schedule, Documents, Settings } from '@/pages/student/screens';
import TeacherDashboardPage from '@/pages/teacher/TeacherDashboardPage';
import ParentDashboardPage from './pages/parent/ParentDashboardPage';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-form" element={<RegisterFormPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/student-login" element={<StudentLoginPage />} />
          {/* Removed legacy redirect for old single dashboard route */}
          {/* Nested student portal */}
          <Route path="/student" element={<StudentShell />}> 
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="progress" element={<AcademicProgress />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="payments" element={<Payments />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="documents" element={<Documents />} />
          </Route>
          <Route path="/parent-dashboard" element={<ParentDashboardPage />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboardPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

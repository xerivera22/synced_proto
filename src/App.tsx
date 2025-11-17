import AdminShell from "@/pages/admin/layout/AdminShell";
import {
  AdminAnnouncements,
  AdminDashboard,
  AdminEvents,
  AdminFaculty,
  AdminPayments,
  AdminSettings,
  AdminStudents,
} from "@/pages/admin/screens";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
// Dashboards remain at root pages for now; will be reorganized later
import AdminLoginPage from "@/pages/landing/AdminLoginPage";
// Landing/public/auth pages grouped under pages/landing
import LandingPage from "@/pages/landing/LandingPage";
import PricingPage from "@/pages/landing/PricingPage";
import RegisterFormPage from "@/pages/landing/RegisterFormPage";
import RegisterPage from "@/pages/landing/RegisterPage";
import StudentLoginPage from "@/pages/landing/StudentLoginPage";
import StudentShell from "@/pages/student/layout/StudentShell";
import {
  AcademicProgress,
  Attendance,
  Documents,
  Overview,
  Payments,
  Profile,
  Schedule,
  Settings,
} from "@/pages/student/screens";
import TeacherShell from "@/pages/teacher/layout/TeacherShell";
import {
  TeacherAttendance,
  TeacherChat,
  TeacherOverview,
  TeacherProfile,
  TeacherSchedule,
  TeacherSettings,
  TeacherSubjectDetail,
  TeacherSubjects,
} from "@/pages/teacher/screens";
import TeacherGradebookRedirect from "@/pages/teacher/screens/gradebook-redirect";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import ParentShell from "./pages/parent/layout/ParentShell";
import {
  ParentAcademicProgress,
  ParentAttendance,
  ParentDocuments,
  ParentMessages,
  ParentOverview,
  ParentPayments,
  ParentProfile,
  ParentSchedule,
  ParentSettings,
} from "./pages/parent/screens";

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
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="faculty" element={<AdminFaculty />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
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
          <Route path="/parent" element={<ParentShell />}>
            <Route index element={<ParentOverview />} />
            <Route path="overview" element={<ParentOverview />} />
            <Route path="academic-progress" element={<ParentAcademicProgress />} />
            <Route path="attendance" element={<ParentAttendance />} />
            <Route path="schedule" element={<ParentSchedule />} />
            <Route path="payments" element={<ParentPayments />} />
            <Route path="documents" element={<ParentDocuments />} />
            <Route path="messages" element={<ParentMessages />} />
            <Route path="profile" element={<ParentProfile />} />
            <Route path="settings" element={<ParentSettings />} />
          </Route>
          {/* Legacy teacher dashboard route now redirects to new portal */}
          <Route path="/teacher-dashboard" element={<Navigate to="/teacher/overview" replace />} />
          <Route path="/teacher" element={<TeacherShell />}>
            <Route index element={<TeacherOverview />} />
            <Route path="overview" element={<TeacherOverview />} />
            <Route path="subjects" element={<TeacherSubjects />} />
            <Route path="subjects/:id" element={<TeacherSubjectDetail />} />
            <Route path="gradebook" element={<TeacherGradebookRedirect />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="schedule" element={<TeacherSchedule />} />
            <Route path="chat" element={<TeacherChat />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="settings" element={<TeacherSettings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

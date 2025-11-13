import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ParentDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth state before checking role to avoid bounce
    if (user === null) return;
    if (user.role !== 'parent') {
      // Reuse the Student/Parent login page
      navigate('/student-login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 flex items-center gap-10 px-8 py-5 bg-white border-b">
        <div className="flex items-center gap-2.5 font-bold text-2xl text-primary">
          <img src="/syncED.png" alt="SyncED Logo" className="w-9 h-9" />
          <span>SyncED</span>
        </div>
        <ul className="flex list-none gap-6 ml-auto">
          <li><a href="/" className="text-text hover:text-primary">Home</a></li>
          <li><button onClick={handleLogout} className="text-red-600 hover:text-red-700 bg-transparent border-0 cursor-pointer">Logout</button></li>
        </ul>
      </nav>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-4xl font-bold text-text mb-4">You are signed in!</h1>
            <p className="text-xl text-muted mb-8">Welcome back, Parent. You have successfully logged into SyncED.</p>
            <div className="flex gap-4 justify-center">
              <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark">View Child's Grades</button>
              <button className="bg-gray-200 text-text px-8 py-4 rounded-lg font-semibold hover:bg-gray-300">Attendance</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentDashboardPage;

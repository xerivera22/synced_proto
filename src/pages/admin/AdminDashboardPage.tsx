import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth to resolve before guarding the route
    if (user === null) return;
    if (user.role !== "admin") {
      navigate("/admin-login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 flex items-center gap-10 px-8 py-5 bg-white border-b">
        <div className="flex items-center gap-2.5 font-bold text-2xl text-primary">
          <img src="/syncED.png" alt="SyncED Logo" className="w-9 h-9" />
          <span>SyncED</span>
        </div>
        <ul className="flex list-none gap-6 ml-auto">
          <li>
            <a href="/" className="text-text hover:text-primary">
              Home
            </a>
          </li>
          <li>
            <a href="/pricing" className="text-text hover:text-primary">
              Pricing
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-red-600 hover:text-red-700 bg-transparent border-0 cursor-pointer font-medium"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-4xl font-bold text-text mb-4">Welcome to SyncED Admin Dashboard</h1>
            <p className="text-xl text-muted mb-8">
              You have successfully logged in as School Administrator.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-soft p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-text">School Management</h3>
              <p className="text-muted mb-4">Manage your school operations efficiently</p>
              <button
                type="button"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold w-full hover:bg-primary-dark"
              >
                Access Tools
              </button>
            </div>
            <div className="bg-soft p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-text">Reports & Analytics</h3>
              <p className="text-muted mb-4">View comprehensive reports and insights</p>
              <button
                type="button"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold w-full hover:bg-primary-dark"
              >
                View Reports
              </button>
            </div>
            <div className="bg-soft p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-text">Settings</h3>
              <p className="text-muted mb-4">Configure your school settings</p>
              <button
                type="button"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold w-full hover:bg-primary-dark"
              >
                Open Settings
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;

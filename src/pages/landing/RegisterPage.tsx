import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Building, GraduationCap } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar showSignIn={false} />
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-text mb-4">
              Get Started with SyncED
            </h1>
            <p className="text-xl text-muted">
              Choose your role to access the appropriate dashboard
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <Link
              to="/admin-login"
              className="bg-white p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="mb-6 flex justify-center">
                <Building className="text-primary" size={64} />
              </div>
              <h3 className="text-2xl font-semibold text-text mb-4">
                School Administrator
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Manage school operations, finances, and reports
              </p>
              <button
                type="button"
                className="bg-primary text-white border-0 px-6 py-3 rounded-md font-semibold text-base hover:bg-blue-700"
              >
                Admin Login
              </button>
            </Link>
            <Link
              to="/student-login"
              className="bg-white p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="mb-6 flex justify-center">
                <GraduationCap className="text-primary" size={64} />
              </div>
              <h3 className="text-2xl font-semibold text-text mb-4">
                Student / Parent
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                View grades, attendance, and stay connected
              </p>
              <button
                type="button"
                className="bg-primary text-white border-0 px-6 py-3 rounded-md font-semibold text-base hover:bg-blue-700"
              >
                Student Login
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RegisterPage;

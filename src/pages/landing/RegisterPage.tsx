import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Briefcase, Building, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Link
              to="/admin-login"
              className="bg-white p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors rounded-xl border border-gray-100 shadow-sm hover:shadow-md"
            >
              <div className="mb-6 flex justify-center">
                <Building className="text-primary" size={56} />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">
                School Administrator
              </h3>
              <p className="text-muted leading-relaxed mb-6 text-sm">
                Manage school operations, finances, and reports
              </p>
              <button
                type="button"
                className="bg-primary text-white border-0 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark w-full"
              >
                Admin Login
              </button>
            </Link>
            <Link
              to="/teacher-login"
              className="bg-white p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors rounded-xl border border-gray-100 shadow-sm hover:shadow-md"
            >
              <div className="mb-6 flex justify-center">
                <Briefcase className="text-primary" size={56} />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">
                Teacher
              </h3>
              <p className="text-muted leading-relaxed mb-6 text-sm">
                Manage classes, grades, and student interactions
              </p>
              <button
                type="button"
                className="bg-primary text-white border-0 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark w-full"
              >
                Teacher Login
              </button>
            </Link>
            <Link
              to="/parent-login"
              className="bg-white p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors rounded-xl border border-gray-100 shadow-sm hover:shadow-md"
            >
              <div className="mb-6 flex justify-center">
                <Users className="text-primary" size={56} />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">
                Parent
              </h3>
              <p className="text-muted leading-relaxed mb-6 text-sm">
                Monitor your child's progress and stay informed
              </p>
              <button
                type="button"
                className="bg-primary text-white border-0 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark w-full"
              >
                Parent Login
              </button>
            </Link>
            <Link
              to="/student-login"
              className="bg-white p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors rounded-xl border border-gray-100 shadow-sm hover:shadow-md"
            >
              <div className="mb-6 flex justify-center">
                <GraduationCap className="text-primary" size={56} />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">
                Student
              </h3>
              <p className="text-muted leading-relaxed mb-6 text-sm">
                View grades, attendance, and stay connected
              </p>
              <button
                type="button"
                className="bg-primary text-white border-0 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark w-full"
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

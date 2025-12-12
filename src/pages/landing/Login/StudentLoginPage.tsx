import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { studentAuthService } from "@/services/Authentication/studentAuthService";
import { ArrowRight, Eye, EyeOff, GraduationCap } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, setUserData, logout, user } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Logout first to clear any existing session
    logout();

    try {
      const response = await studentAuthService.login(email, password);

      if (response.message === "Login successful" && response.student) {
        login(response.student.email, "student");

        // Set user data globally
        setUserData({
          ...response.student,
          profile: response.profile, // Include full profile data
        });

        console.log(user);

        navigate("/student/overview");
      } else {
        setError(response.message || "Login failed. Please try again.");
        setPassword("");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <Navbar showSignIn={false} />
      <section className="py-20 min-h-[80vh] flex items-center">
        <div className="max-w-lg mx-auto px-8 w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Student Portal
            </h1>
            <p className="text-gray-600">
              Access your courses and track your progress
            </p>
          </div>

          {/* Login Card */}
          <div className="relative bg-white p-10 rounded-2xl border border-gray-200 shadow-lg">
            <div className="absolute inset-x-0 -top-0.5 h-1.5 rounded-t-2xl bg-primary" />

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="mb-5">
                <label
                  htmlFor="studentEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  id="studentEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <label
                  htmlFor="studentPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="studentPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 pr-16 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary p-2"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-primary rounded focus:ring-primary"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    console.log("TODO: implement password reset flow")
                  }
                  className="text-sm text-primary hover:text-primary-dark hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3.5 bg-primary text-white rounded-lg text-base font-semibold hover:bg-primary-dark shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  Don't have an account?{" "}
                  <a
                    href="/student-register"
                    className="text-primary no-underline hover:underline"
                  >
                    Create one here
                  </a>
                </p>
                
                <p className="text-gray-500 text-sm mt-3">
                  You're not a Student?{" "}
                  <a
                    href="/register"
                    className="text-primary no-underline hover:underline"
                  >
                    Click here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLoginPage;

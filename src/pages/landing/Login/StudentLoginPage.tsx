import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { studentAuthService } from "@/services/Authentication/studentAuthService";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
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
  const { login, setUserData } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await studentAuthService.login(email, password);

      if (response.message === "Login successful" && response.student) {
        login(response.student.email, "student");

        // Set user data globally
        setUserData({
          ...response.student,
          profile: response.profile, // Include full profile data
        });

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
    <div className="min-h-screen bg-white">
      <Navbar showSignIn={false} />
      <section className="bg-white py-20 min-h-[80vh] flex items-center">
        <div className="max-w-lg mx-auto px-8 w-full">
          <div className="relative bg-white p-10 rounded-2xl border border-gray-200 shadow-sm">
            <div className="absolute inset-x-0 -top-0.5 h-1.5 rounded-t-2xl bg-primary" />
            <h1 className="text-2xl font-semibold text-primary text-center mb-8">
              Student/Parent Login
            </h1>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}
              <div className="mb-5">
                <label
                  htmlFor="studentEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="studentEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                  required
                />
              </div>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 pr-16 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary px-2 py-1"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6 mt-4 w-full">
                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer m-0">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 m-0 cursor-pointer"
                  />
                  <span className="select-none">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    console.log("TODO: implement password reset flow")
                  }
                  className="bg-transparent border-0 p-0 text-sm text-primary whitespace-nowrap cursor-pointer hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary text-white border-0 rounded-lg text-base font-semibold cursor-pointer hover:bg-primary-dark shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
                {!loading && <ArrowRight size={18} />}
              </button>
              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  Don't have an account?{" "}
                  <a
                    href="/register-form"
                    className="text-primary no-underline hover:underline"
                  >
                    Create one here
                  </a>
                </p>
                <p className="text-gray-500 text-sm mt-3">
                  You're not a Student/Parent?{" "}
                  <a
                    href="/student-register"
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

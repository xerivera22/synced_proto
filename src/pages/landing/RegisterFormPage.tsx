import Navbar from "@/components/Navbar";
import { adminAuthService } from "@/services/Authentication/adminAuthService";
import { Eye, EyeOff } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterFormPage = () => {
  const navigate = useNavigate();
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    schoolName: "",
    schoolAddress: "",
    schoolType: "",
    numberOfStudents: "",
    position: "",
    agreeToTerms: false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      setLoading(true);
      const response = await adminAuthService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        schoolName: formData.schoolName,
        schoolAddress: formData.schoolAddress,
        schoolType: formData.schoolType,
        numberOfStudents: formData.numberOfStudents,
        position: formData.position,
      });
      if (response?.success === false) {
        setError(response?.message || "Registration failed. Please try again.");
        return;
      }
      setFormData({ ...initialFormData });
      alert("Account created successfully!");
      navigate("/register");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showSignIn={false} showRegister={false} />
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[80vh]">
            <div className="p-16">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-text mb-2">
                  Create Your Account
                </h2>
                <p className="text-muted text-lg">Register now with SyncED</p>
              </div>
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block font-semibold text-gray-700 mb-2 text-sm"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block font-semibold text-gray-700 mb-2 text-sm"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                      required
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="emailAddress"
                    className="block font-semibold text-gray-700 mb-2 text-sm"
                  >
                    Email Address
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label
                      htmlFor="password"
                      className="block font-semibold text-gray-700 mb-2 text-sm"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full p-4 pr-16 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary p-2"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block font-semibold text-gray-700 mb-2 text-sm"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full p-4 pr-16 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary p-2"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        title={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-8 mb-5 pb-3 border-b-2 border-gray-200">
                  <h3 className="text-gray-700 text-lg font-semibold">
                    School Information
                  </h3>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="schoolName"
                    className="block font-semibold text-gray-700 mb-2 text-sm"
                  >
                    School Name
                  </label>
                  <input
                    id="schoolName"
                    type="text"
                    value={formData.schoolName}
                    onChange={(e) =>
                      setFormData({ ...formData, schoolName: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="flex items-start gap-3 cursor-pointer text-sm leading-relaxed">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          agreeToTerms: e.target.checked,
                        })
                      }
                      className="w-auto m-0 mt-1"
                    />
                    <span>
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-primary no-underline hover:underline"
                      >
                        Terms and Conditions
                      </a>
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full p-4 bg-primary text-white border-0 rounded-md text-base font-semibold cursor-pointer hover:bg-primary-dark mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
                <div className="text-center mt-6">
                  <p className="text-muted text-sm">
                    Already have an account?{" "}
                    <a
                      href="/register"
                      className="text-primary no-underline font-semibold hover:underline"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterFormPage;

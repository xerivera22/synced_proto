import Navbar from "@/components/Navbar";
import { parentAuthService } from "@/services/Authentication/parentAuthService";
import { Eye, EyeOff } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const ParentRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Parent Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    occupation: "",
    password: "",
    confirmPassword: "",

    // Child Info (first child)
    childFirstName: "",
    childLastName: "",
    childDateOfBirth: "",
    childGradeLevel: "",
    childSchoolName: "",

    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }
    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      const parentData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        occupation: formData.occupation,
        password: formData.password,
        children: [
          {
            firstName: formData.childFirstName,
            lastName: formData.childLastName,
            birthDate: formData.childDateOfBirth,
            gradeLevel: formData.childGradeLevel,
            schoolName: formData.childSchoolName,
          },
        ],
      };

      const response = await parentAuthService.register(parentData);

      if (response.success || response.message === "Registration successful") {
        alert("Parent account created successfully!");
        navigate("/parent-login");
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showSignIn={false} showRegister={false} />
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-16">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-text mb-2">
                  Create Parent Account
                </h2>
                <p className="text-muted text-lg">
                  Register as a parent on SyncED
                </p>
              </div>
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                    {error}
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-gray-700 text-lg font-semibold mb-4">
                    Parent Information
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      First Name
                    </label>
                    <input
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
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Last Name
                    </label>
                    <input
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

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      maxLength={11}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block font-semibold text-gray-700 mb-2 text-sm">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Occupation
                    </label>
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) =>
                        setFormData({ ...formData, occupation: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="mt-8 mb-5 pb-3 border-b-2 border-gray-200">
                  <h3 className="text-gray-700 text-lg font-semibold">
                    Child Information (First Child)
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Child First Name
                    </label>
                    <input
                      type="text"
                      value={formData.childFirstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          childFirstName: e.target.value,
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Child Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.childLastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          childLastName: e.target.value,
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Child Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.childDateOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          childDateOfBirth: e.target.value,
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Grade Level
                    </label>
                    <input
                      type="text"
                      value={formData.childGradeLevel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          childGradeLevel: e.target.value,
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block font-semibold text-gray-700 mb-2 text-sm">
                    School Name
                  </label>
                  <input
                    type="text"
                    value={formData.childSchoolName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        childSchoolName: e.target.value,
                      })
                    }
                    className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-primary focus:bg-white"
                    required
                  />
                </div>

                <div className="mt-8 mb-5 pb-3 border-b-2 border-gray-200">
                  <h3 className="text-gray-700 text-lg font-semibold">
                    Account Security
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Password
                    </label>
                    <div className="relative">
                      <input
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
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
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
                  {loading ? "Creating Account..." : "Create Parent Account"}
                </button>

                <div className="text-center mt-6">
                  <p className="text-muted text-sm">
                    Already have an account?{" "}
                    <a
                      href="/parent-login"
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

export default ParentRegistration;

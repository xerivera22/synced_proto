import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { teacherAuthService } from "@/services/Authentication/teacherAuthService";

const TeacherRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    hiredDate: "",
    department: "",
    adviserOf: "",
    loadHours: "",
    password: "",
    confirmPassword: "",

    // Emergency Contact
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    emergencyContactEmail: "",

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
      const teacherData = {
        teacherInfo: {
          name: formData.name,
          employeeId: formData.employeeId,
          email: formData.email,
          phone: formData.phone,
          role: "teacher", // Default role as teacher
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
          hiredDate: formData.hiredDate,
          department: formData.department,
          adviserOf: formData.adviserOf,
          loadHours: formData.loadHours,
          password: formData.password,
        },
        emergencyContact: {
          name: formData.emergencyContactName,
          relationship: formData.emergencyContactRelationship,
          phone: formData.emergencyContactPhone,
          email: formData.emergencyContactEmail,
        },
      };

      const response = await teacherAuthService.register(teacherData);
      setFormData({
        name: "",
        employeeId: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        hiredDate: "",
        department: "",
        adviserOf: "",
        loadHours: "",
        password: "",
        confirmPassword: "",

        // Emergency Contact
        emergencyContactName: "",
        emergencyContactRelationship: "",
        emergencyContactPhone: "",
        emergencyContactEmail: "",

        agreeToTerms: false,
      });
      navigate("/teacher-login");
      if (response.success) {
        alert("Teacher account created successfully!");
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
                  Create Teacher Account
                </h2>
                <p className="text-muted text-lg">
                  Register as a teacher with SyncED
                </p>
              </div>
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                    {error}
                  </div>
                )}

                <div className="mb-5">
                  <label className="block font-semibold text-gray-700 mb-2 text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) =>
                        setFormData({ ...formData, employeeId: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                      required
                    />
                  </div>
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
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                      required
                    />
                  </div>
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
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
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
                    className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Hired Date
                    </label>
                    <input
                      type="date"
                      value={formData.hiredDate}
                      onChange={(e) =>
                        setFormData({ ...formData, hiredDate: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Adviser Of
                    </label>
                    <input
                      type="text"
                      value={formData.adviserOf}
                      onChange={(e) =>
                        setFormData({ ...formData, adviserOf: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Load Hours
                    </label>
                    <input
                      type="text"
                      value={formData.loadHours}
                      onChange={(e) =>
                        setFormData({ ...formData, loadHours: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="mt-8 mb-5 pb-3 border-b-2 border-gray-200">
                  <h3 className="text-gray-700 text-lg font-semibold">
                    Emergency Contact
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContactName: e.target.value,
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContactRelationship}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContactRelationship: e.target.value,
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContactPhone: e.target.value,
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2 text-sm">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.emergencyContactEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContactEmail: e.target.value,
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
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
                        className="w-full p-4 pr-16 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-500 hover:underline px-2 py-1"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? "Hide" : "Show"}
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
                        className="w-full p-4 pr-16 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-500 hover:underline px-2 py-1"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
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
                        className="text-blue-500 no-underline hover:underline"
                      >
                        Terms and Conditions
                      </a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full p-4 bg-blue-500 text-white border-0 rounded-md text-base font-semibold cursor-pointer hover:bg-blue-600 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Teacher Account"}
                </button>

                <div className="text-center mt-6">
                  <p className="text-muted text-sm">
                    Already have an account?{" "}
                    <a
                      href="/teacher-login"
                      className="text-blue-500 no-underline font-semibold hover:underline"
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

export default TeacherRegistration;

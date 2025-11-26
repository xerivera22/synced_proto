
import Banner from "@/components/shared/Banner";
import { useState, useEffect, FormEvent } from "react";
import { teacherAuthService } from "@/services/Authentication/teacherAuthService";
import { facultyRecordService } from "@/services/facultyRecordService";

// Updated interface to better match teacher data
interface FacultyRecord {
  id: string;
  name: string;
  department: string;
  email: string;
  employeeId: string;
}

const AddTeacherModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}) => {
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
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    emergencyContactEmail: "",
  });
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

    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || "Failed to add teacher. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
        >
          &times;
        </button>
        <h3 className="text-2xl font-semibold text-slate-900 mb-6">
          Add New Teacher
        </h3>
        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto pr-4">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2 text-sm">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm">Employee ID</label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                    Password
                </label>
                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white"
                    required
                />
            </div>
            <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                    Confirm Password
                </label>
                <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white"
                    required
                />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Faculty = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [facultyRecords, setFacultyRecords] = useState<FacultyRecord[]>([]);

  const fetchFaculty = async () => {
    try {
      const data = await facultyRecordService.getFacultyRecords();
      // Map the response to the updated FacultyRecord interface
      const formattedData = data.map((teacher: any) => ({
        id: teacher._id,
        name: teacher.teacherInfo.name,
        department: teacher.teacherInfo.department,
        email: teacher.teacherInfo.email,
        employeeId: teacher.teacherInfo.employeeId,
      }));
      setFacultyRecords(formattedData);
    } catch (error) {
      console.error("Failed to fetch faculty records:", error);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleAddTeacher = async (formData: any) => {
    const teacherData = {
      teacherInfo: {
        name: formData.name,
        employeeId: formData.employeeId,
        email: formData.email,
        phone: formData.phone,
        role: "teacher",
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
    if (response.success) {
      alert("Teacher account created successfully!");
      setIsModalOpen(false);
      fetchFaculty(); // Refresh the faculty list
    } else {
      throw new Error(response.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Faculty Directory"
        subtitle="Maintain teacher profiles to support scheduling, announcements, and access levels."
      />

      <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-indigo-900">Faculty Overview</h2>
            <p className="text-sm text-indigo-700/80">
              Keep teacher profiles current to support scheduling and announcements.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50"
          >
            Add Teacher
          </button>
        </header>
        <div className="overflow-x-auto">
          <div className="rounded-2xl border border-indigo-100/60 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-indigo-100 text-left text-sm text-slate-700">
              <thead className="bg-indigo-50 text-xs uppercase tracking-wide text-indigo-600">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-50">
                {facultyRecords.map((teacher) => (
                  <tr key={teacher.id} className="bg-white">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{teacher.name}</div>
                      <div className="text-xs text-slate-400">ID: {teacher.employeeId}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{teacher.department}</td>
                    <td className="px-4 py-3 text-sm text-indigo-600">{teacher.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddTeacherModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTeacher}
        />
      )}
    </div>
  );
};

export default Faculty;

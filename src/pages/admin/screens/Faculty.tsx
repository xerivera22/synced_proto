import Banner from "@/components/shared/Banner";
import { useState, useEffect } from "react";
import { facultyRecordService } from "@/services/facultyRecordService";

// Define the type for a faculty record
interface FacultyRecord {
  id: string;
  name: string;
  department: string;
  subjects: number | string; // Adjust based on what the API returns
  contact: string;
}

const AddTeacherModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: any) => void;
}) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [subjects, setSubjects] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, department, subjects, contact });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="teacherName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="teacherName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="teacherDepartment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department
              </label>
              <input
                type="text"
                id="teacherDepartment"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="teacherSubjects"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subjects (comma-separated)
            </label>
            <input
              type="text"
              id="teacherSubjects"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="teacherContact"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contact Email
            </label>
            <input
              type="email"
              id="teacherContact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              Add Teacher
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

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await facultyRecordService.getFacultyRecords();
        setFacultyRecords(data);
      } catch (error) {
        console.error("Failed to fetch faculty records:", error);
      }
    };
    fetchFaculty();
  }, []);

  const handleAddTeacher = async (teacherData: any) => {
    try {
      // Assuming subjects are comma-separated and we need to send them as an array or count
      const dataToSubmit = {
        ...teacherData,
        subjects: teacherData.subjects.split(',').map((s: string) => s.trim())
      };

      const newTeacher = await facultyRecordService.createFacultyRecord(dataToSubmit);
      setFacultyRecords([...facultyRecords, newTeacher]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add teacher:", error);
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
                  <th className="px-4 py-3">Subjects</th>
                  <th className="px-4 py-3">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-50">
                {facultyRecords.map((teacher) => (
                  <tr key={teacher.id} className="bg-white">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{teacher.name}</div>
                      <div className="text-xs text-slate-400">ID: {teacher.id}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{teacher.department}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {/* Adjust based on your data structure, this assumes 'subjects' is a number or can be counted */}
                      {Array.isArray(teacher.subjects) ? teacher.subjects.length : teacher.subjects} subjects
                    </td>
                    <td className="px-4 py-3 text-sm text-indigo-600">{teacher.contact}</td>
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

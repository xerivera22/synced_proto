import Card from "@/components/shared/Card";
import { Table } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddSubjectModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: any) => void;
}) => {
  const [subjectName, setSubjectName] = useState("");
  const [section, setSection] = useState("");
  const [students, setStudents] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ subjectName, section, students });
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
          Add New Subject
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="subjectName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subject Name
            </label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="section"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Section
              </label>
              <input
                type="text"
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="students"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Students
              </label>
              <input
                type="number"
                id="students"
                value={students}
                onChange={(e) => setStudents(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-slate-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function TeacherSubjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSubject = (subjectData: any) => {
    console.log("New Subject Data:", subjectData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-3">
      {/* Title banner (student-style) */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Subjects</h1>
            <p className="text-white/80 text-sm mt-0.5">Manage classes and sections</p>
          </div>
        </div>
      </div>
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Subjects</h2>
            <p className="text-sm text-slate-500">
              Select a subject to manage overview, class records, attendance, and materials.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Add Subject (mock)
          </button>
        </header>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="rounded-xl border border-[#647FBC]/20 bg-white/80 p-4 shadow-sm transition hover:border-[#647FBC]/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Sample Subject {id}</p>
                  <p className="text-xs text-slate-500">Section A • 30 students</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/teacher/subjects/${id}`}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
                  >
                    Open
                  </Link>
                  <Link
                    to={`/teacher/subjects/${id}?tab=class-records`}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
                  >
                    Class Records
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      {isModalOpen && (
        <AddSubjectModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddSubject}
        />
      )}
    </div>
  );
}

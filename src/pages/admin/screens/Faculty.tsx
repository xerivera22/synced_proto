import Banner from "@/components/shared/Banner";
import { facultyRecords } from "../data/mockData";

const Faculty = () => {
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
            className="rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50"
          >
            Add teacher (mock)
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
                      {teacher.subjects} subjects
                    </td>
                    <td className="px-4 py-3 text-sm text-indigo-600">{teacher.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-indigo-700/70">
          This directory uses mock data — replace with API integration once services are ready.
        </p>
      </div>
    </div>
  );
};

export default Faculty;

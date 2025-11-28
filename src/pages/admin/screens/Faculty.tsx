
import Banner from "@/components/shared/Banner";
import { useEffect, useState } from "react";
import { teacherProfileService } from "@/services/teacherProfileService";

interface TeacherInfo {
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  department: string;
  office: string;
}

interface TeacherProfile {
  teacherInfo: TeacherInfo;
}

const Faculty = () => {
  const [teacherProfiles, setTeacherProfiles] = useState<TeacherProfile[]>([]);

  useEffect(() => {
    teacherProfileService.getTeacherProfiles().then(setTeacherProfiles);
  }, []);

  return (
    <div className="space-y-6">
      <Banner
        title="Faculty Directory"
        subtitle="Browse and manage faculty profiles."
      />

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Faculty Members</h2>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Employee ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Office</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teacherProfiles.map((profile, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-3 font-medium text-gray-900">{profile.teacherInfo.name}</td>
                  <td className="px-4 py-3">{profile.teacherInfo.employeeId}</td>
                  <td className="px-4 py-3">{profile.teacherInfo.email}</td>
                  <td className="px-4 py-3">{profile.teacherInfo.phone}</td>
                  <td className="px-4 py-3">{profile.teacherInfo.department}</td>
                  <td className="px-4 py-3">{profile.teacherInfo.office}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {teacherProfiles.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No faculty records found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Faculty;


import Banner from "@/components/shared/Banner";
import { useEffect, useState } from "react";
import { studentProfileService } from "@/services/studentProfileService";

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

interface Achievement {
  title: string;
  semester: string;
  date: string;
  year: string;
  icon: string;
}

interface StudentInfo {
  name: string;
  studentId: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  dateOfBirth: string;
  enrollmentDate: string;
  expectedGraduation: string;
  major: string;
  minor: string;
  advisor: string;
  gpa: string;
  creditHours: string;
}

interface StudentProfile {
  studentInfo: StudentInfo;
  emergencyContact: EmergencyContact;
  achievements: Achievement[];
}

const Students = () => {
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>([]);

  useEffect(() => {
    studentProfileService.getStudentProfiles().then(setStudentProfiles);
  }, []);

  return (
    <div className="space-y-6">
      <Banner
        title="Student Records"
        subtitle="Monitor enrollment health and individual progress across the school."
      />

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Detailed Records</h2>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Student ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Date of Birth</th>
                <th className="px-4 py-3">Enrollment Date</th>
                <th className="px-4 py-3">Expected Graduation</th>
                <th className="px-4 py-3">Major</th>
                <th className="px-4 py-3">Advisor</th>
                <th className="px-4 py-3">GPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {studentProfiles.map((profile, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-3 font-medium text-gray-900">{profile.studentInfo.name}</td>
                  <td className="px-4 py-3">{profile.studentInfo.studentId}</td>
                  <td className="px-4 py-3">{profile.studentInfo.email}</td>
                  <td className="px-4 py-3">{profile.studentInfo.phone}</td>
                  <td className="px-4 py-3">{profile.studentInfo.address}</td>
                  <td className="px-4 py-3">{profile.studentInfo.dateOfBirth}</td>
                  <td className="px-4 py-3">{profile.studentInfo.enrollmentDate}</td>
                  <td className="px-4 py-3">{profile.studentInfo.expectedGraduation}</td>
                  <td className="px-4 py-3">{profile.studentInfo.major}</td>
                  <td className="px-4 py-3">{profile.studentInfo.advisor}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{profile.studentInfo.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {studentProfiles.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No student records found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Students;

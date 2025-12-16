import Banner from "@/components/shared/Banner";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/pages/student/components/ui/avatar";
import { Button } from "@/pages/student/components/ui/button";
import { studentProfileService } from "@/services/studentProfileService";
import { Edit, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getParentPortalDate } from "../utils/date";

interface StudentData {
  studentInfo: {
    name: string;
    studentId: string;
    email: string;
    course: string;
    enrollmentDate: string;
  };
}

const ParentProfile = () => {
  const dateLabel = getParentPortalDate();
  const { userData } = useAuth();
  const [linkedStudent, setLinkedStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const accountName = userData?.name || userData?.email?.split("@")[0] || "Parent";
  const linkedStudentId = userData?.linkedStudentId;

  useEffect(() => {
    const fetchLinkedStudent = async () => {
      if (linkedStudentId) {
        try {
          const studentData = await studentProfileService.getStudentProfileById(linkedStudentId);
          setLinkedStudent(studentData);
        } catch (err) {
          console.error("Error fetching linked student:", err);
        }
      }
      setLoading(false);
    };
    fetchLinkedStudent();
  }, [linkedStudentId]);

  const studentInfo = {
    name: linkedStudent?.studentInfo?.name || userData?.linkedStudentName || "No student linked",
    studentId: linkedStudent?.studentInfo?.studentId || "N/A",
    email: linkedStudent?.studentInfo?.email || "N/A",
    course: linkedStudent?.studentInfo?.course || "Not enrolled",
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Profile"
        subtitle="Keep student and guardian details up to date."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <section className="grid gap-6 md:grid-cols-3">
        {/* Parent Profile */}
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="w-14 h-14">
                <AvatarImage src="/placeholder-avatar.jpg" alt={accountName} />
                <AvatarFallback className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white">
                  {accountName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-base font-semibold text-slate-900">{accountName}</h2>
                <p className="text-sm text-slate-500">Parent / Guardian</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-sm">
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{userData?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{userData?.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Address
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                {userData?.address || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Relationship
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">{userData?.relationship || "Parent"}</p>
            </div>
          </div>
        </article>

        {/* Student Info (Side Column) */}
        <section className="space-y-6">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Student Information</h3>
            {loading ? (
              <div className="text-center py-4">
                <p className="text-slate-500 text-sm">Loading...</p>
              </div>
            ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{studentInfo.name}</p>
                  <p className="text-xs text-slate-500">{studentInfo.course}</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Email</span>
                  <span className="font-medium text-slate-900 text-xs">{studentInfo.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">ID</span>
                  <span className="font-medium text-slate-900">{studentInfo.studentId}</span>
                </div>
              </div>
            </div>
            )}
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Account Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Occupation</span>
                <span className="font-medium text-slate-900">{userData?.occupation || "Not provided"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Linked Student ID</span>
                <span className="font-medium text-slate-900">{linkedStudentId || "Not linked"}</span>
              </div>
              <Button variant="outline" className="w-full text-xs h-8">
                Edit Profile
              </Button>
            </div>
          </article>
        </section>
      </section>
    </div>
  );
};

export default ParentProfile;

import Banner from "@/components/shared/Banner";
import { useAuth } from "@/context/AuthContext";
import { studentProfileService } from "@/services/studentProfileService";
import { subjectService } from "@/services/subjectService";
import { useEffect, useState } from "react";
import { getParentPortalDate } from "../utils/date";

interface Subject {
  _id: string;
  subjectName: string;
  subjectCode: string;
  department: string;
}

interface StudentData {
  studentInfo: {
    name: string;
    studentId: string;
    course: string;
  };
}

const ParentAcademicProgress = () => {
  const dateLabel = getParentPortalDate();
  const { userData } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [linkedStudent, setLinkedStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  const linkedStudentId = userData?.linkedStudentId;
  const linkedStudentName = userData?.linkedStudentName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch linked student
        if (linkedStudentId) {
          const studentData = await studentProfileService.getStudentProfileById(linkedStudentId);
          setLinkedStudent(studentData);
        }

        // Fetch subjects
        const subjectsData = await subjectService.getSubjects();
        setSubjects(subjectsData);
      } catch (error) {
        console.error("Error fetching academic data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [linkedStudentId]);

  const summaryCards = [
    {
      label: "Linked Student",
      value: linkedStudent?.studentInfo?.name || linkedStudentName || "Not linked",
      subtext: linkedStudent?.studentInfo?.studentId || "Link in admin panel",
      containerClass: "border-emerald-100 bg-emerald-50",
      badgeClass: "text-emerald-700",
    },
    {
      label: "Enrolled Subjects",
      value: subjects.length.toString(),
      subtext: "Current semester",
      containerClass: "border-sky-100 bg-sky-50",
      badgeClass: "text-sky-700",
    },
    {
      label: "Course",
      value: linkedStudent?.studentInfo?.course || "N/A",
      subtext: "Program of study",
      containerClass: "border-indigo-100 bg-indigo-50",
      badgeClass: "text-indigo-700",
    },
    {
      label: "Status",
      value: linkedStudentId ? "Active" : "Not Linked",
      subtext: linkedStudentId ? "Student is linked" : "Link a student",
      containerClass: "border-amber-100 bg-amber-50",
      badgeClass: "text-amber-700",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <Banner
          title="Academic Progress"
          subtitle="Loading..."
          right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
        />
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#647FBC] mb-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Banner
        title="Academic Progress"
        subtitle="Track grades, assignments, and upcoming assessments for your student."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className={`rounded-2xl border p-5 shadow-sm ${card.containerClass}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wide ${card.badgeClass}`}>
              {card.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
            <p className="text-xs text-slate-600">{card.subtext}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Enrolled Subjects</h2>
        </header>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {subjects.length === 0 ? (
            <div className="col-span-2 text-center py-8 text-slate-500">
              No subjects found in the system.
            </div>
          ) : (
            subjects.map((subject) => (
              <article key={subject._id} className="rounded-xl border border-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-900">{subject.subjectName}</p>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-lg font-semibold text-slate-700">{subject.subjectCode}</span>
                  <span className="text-xs font-medium text-slate-500">{subject.department}</span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ParentAcademicProgress;

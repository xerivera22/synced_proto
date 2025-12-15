import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";
import { subjectService } from "@/services/subjectService";
import { Building, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeacherPortalDate } from "../utils/date";

interface Subject {
  _id: string;
  subjectName: string;
  subjectCode: string;
  department: string;
  schedules: string[];
  sectionId?: string;
  sectionName?: string;
}

// Helper function to format schedule display
const formatScheduleDisplay = (schedule: string) => {
  const [date, time] = schedule.split(" ");
  const dateObj = new Date(`${date}T${time}:00`);
  return (
    dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }) +
    " " +
    time
  );
};

export default function TeacherSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subjectService.getSubjects();
      setSubjects(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setError("Failed to load subjects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total students (mock calculation - you can replace with real data)
  const calculateTotalStudents = () => {
    // For now, using a mock calculation based on number of subjects
    return subjects.length * 25; // Assuming 25 students per subject on average
  };

  const dateLabel = getTeacherPortalDate();

  return (
    <div className="space-y-3">
      <Banner
        title="Subjects"
        subtitle={`Manage classes and sections • ${subjects.length} subjects • ${calculateTotalStudents()} students`}
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">My Subjects</h2>
            <p className="text-sm text-slate-500">
              Select a subject to manage overview, class records, attendance, and materials.
            </p>
          </div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="mt-5 text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#647FBC] mb-2"></div>
            <p className="text-gray-600">Loading subjects...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mt-5 text-center py-12">
            <div className="text-red-600 mb-2">{error}</div>
            <button
              onClick={fetchSubjects}
              className="px-4 py-2 text-sm font-medium text-[#647FBC] hover:text-[#5a73b3]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Subjects Grid */}
        {!loading && !error && (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-2">No subjects found</div>
                <p className="text-sm text-gray-500">
                  Click "Add Subject" to create your first subject
                </p>
              </div>
            ) : (
              subjects.map((subject) => (
                <div
                  key={subject._id}
                  className="rounded-xl border border-[#647FBC]/20 bg-white/80 p-4 shadow-sm transition hover:border-[#647FBC]/40 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {subject.subjectName}
                        </p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#647FBC]/10 text-[#647FBC]">
                          {subject.subjectCode}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Building size={12} />
                          <span>{subject.department}</span>
                        </div>

                        {subject.sectionName && (
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200"></div>
                            <span>Section: {subject.sectionName}</span>
                          </div>
                        )}

                        {subject.schedules.length > 0 && (
                          <div className="flex items-start gap-2 text-xs text-slate-600">
                            <Clock size={12} className="mt-0.5 flex-shrink-0" />
                            <div>
                              {subject.schedules.slice(0, 1).map((schedule, index) => (
                                <div key={index}>{formatScheduleDisplay(schedule)}</div>
                              ))}
                              {subject.schedules.length > 1 && (
                                <div className="text-slate-400 mt-1">
                                  +{subject.schedules.length - 1} more schedule
                                  {subject.schedules.length - 1 !== 1 ? "s" : ""}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[100px]">
                      <Link
                        to={`/teacher/subjects/${subject._id}`}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-900 hover:border-slate-300 text-center"
                      >
                        Open
                      </Link>
                      <Link
                        to={`/teacher/subjects/${subject._id}?tab=class-records`}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-900 hover:border-slate-300 text-center"
                      >
                        Class Records
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

import Card from "@/components/shared/Card";
import { Table } from "lucide-react";
import { Link } from "react-router-dom";

export default function TeacherSubjects() {
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
    </div>
  );
}

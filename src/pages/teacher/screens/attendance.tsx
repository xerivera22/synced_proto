import { AlertTriangle, Calendar, CheckCircle2, ClipboardCheck, Clock } from "lucide-react";
import Card from "@/components/shared/Card";

export default function TeacherAttendance() {
  return (
    <div className="space-y-3">
      {/* Title banner */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <ClipboardCheck className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Attendance</h1>
            <p className="text-white/80 text-sm mt-0.5">Take and review class attendance</p>
          </div>
        </div>
      </div>
      {/* KPI tiles matching student card style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center bg-[#647FBC]/10 border-[#647FBC]/20">
          <Calendar className="w-5 h-5 mx-auto mb-2 text-[#647FBC]" />
          <p className="text-sm font-semibold mb-1">4</p>
          <p className="text-gray-600 text-xs">Today’s Classes</p>
        </Card>
        <Card className="p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center bg-orange-50 border-orange-100">
          <ClipboardCheck className="w-5 h-5 mx-auto mb-2 text-orange-600" />
          <p className="text-sm font-semibold mb-1">2</p>
          <p className="text-gray-600 text-xs">Pending Attendance</p>
        </Card>
        <Card className="p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center bg-emerald-50 border-emerald-100">
          <CheckCircle2 className="w-5 h-5 mx-auto mb-2 text-emerald-600" />
          <p className="text-sm font-semibold mb-1">3</p>
          <p className="text-gray-600 text-xs">Completed Today</p>
        </Card>
        <Card className="p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center bg-rose-50 border-rose-100">
          <AlertTriangle className="w-5 h-5 mx-auto mb-2 text-rose-600" />
          <p className="text-sm font-semibold mb-1">1</p>
          <p className="text-gray-600 text-xs">Late Submissions</p>
        </Card>
      </div>

      {/* Today list */}
      <Card className="p-4 bg-[#647FBC]/5 border-[#647FBC]/15">
        <h2 className="font-semibold text-sm mb-3">Today’s Classes</h2>
        <div className="space-y-2">
          {[
            { subject: "Mathematics", time: "09:00 AM", room: "Room 201", status: "pending" },
            { subject: "Physics", time: "11:00 AM", room: "Lab 3", status: "done" },
            { subject: "English", time: "02:00 PM", room: "Room 105", status: "pending" },
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium text-sm">{c.subject}</p>
                <p className="text-gray-600 mt-0.5 text-xs">{c.room}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-medium text-[#647FBC] text-xs">{c.time}</p>
                  <div className="flex items-center text-gray-500 mt-0.5">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-xs">50 min</span>
                  </div>
                </div>
                <button
                  className="px-2 py-1 text-xs border rounded-md hover:bg-gray-100"
                  type="button"
                >
                  {c.status === "done" ? "Edit" : "Take"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { ClipboardCheck, Calendar, TrendingUp, AlertTriangle } from "lucide-react";

export function Attendance() {
  const attendanceData = [
    { subject: "Mathematics", attended: 28, total: 30, percentage: 93, status: "good" },
    { subject: "Physics", attended: 26, total: 28, percentage: 93, status: "good" },
    { subject: "Chemistry", attended: 22, total: 25, percentage: 88, status: "warning" },
    { subject: "English", attended: 25, total: 27, percentage: 93, status: "good" },
    { subject: "History", attended: 20, total: 26, percentage: 77, status: "critical" },
    { subject: "Biology", attended: 24, total: 26, percentage: 92, status: "good" },
  ];

  const overallStats = {
    totalClasses: 162,
    attendedClasses: 145,
    overallPercentage: 90,
    requiredPercentage: 75,
  };

  const recentAttendance = [
    { date: "Sep 16", subject: "Mathematics", status: "present", time: "09:00 AM" },
    { date: "Sep 16", subject: "Physics", status: "present", time: "11:00 AM" },
    { date: "Sep 15", subject: "Chemistry", status: "absent", time: "10:00 AM" },
    { date: "Sep 15", subject: "English", status: "present", time: "02:00 PM" },
    { date: "Sep 14", subject: "History", status: "late", time: "01:00 PM" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "critical": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-700";
      case "absent": return "bg-red-100 text-red-700";
      case "late": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-3">
      {/* Header (standardized height and spacing like Overview) */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <ClipboardCheck className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Attendance Record</h1>
            <p className="text-white/80 text-sm mt-0.5">Fall Semester 2025</p>
          </div>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 text-center shadow-sm border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="w-8 h-8 bg-[#647FBC]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-4 h-4 text-[#647FBC]" />
          </div>
          <p className="text-lg font-bold text-[#647FBC] mb-1">{overallStats.overallPercentage}%</p>
          <p className="text-xs text-gray-600">Overall Attendance</p>
        </Card>
        <Card className="p-3 text-center shadow-sm border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="w-8 h-8 bg-[#647FBC]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-4 h-4 text-[#647FBC]" />
          </div>
          <p className="text-lg font-bold text-[#647FBC] mb-1">{overallStats.attendedClasses}</p>
          <p className="text-xs text-gray-600">Classes Attended</p>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Overall Progress</h2>
        <div className="space-y-3">
          <div className="flex justify-between font-medium text-sm">
            <span className="text-gray-700">Attended Classes</span>
            <span className="text-[#647FBC]">{overallStats.attendedClasses}/{overallStats.totalClasses}</span>
          </div>
          <Progress value={overallStats.overallPercentage} className="h-2" />
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Required: {overallStats.requiredPercentage}%</span>
            <span className="font-semibold text-[#647FBC]">{overallStats.overallPercentage}% Complete</span>
          </div>
        </div>
      </Card>

      {/* Subject-wise Attendance */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Subject-wise Attendance</h2>
        <div className="space-y-2">
          {attendanceData.map((subject, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900 text-sm">{subject.subject}</span>
                <div className="flex items-center">
                  {subject.percentage < 80 && (
                    <AlertTriangle className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-bold ${getStatusColor(subject.status)}`}>
                    {subject.percentage}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <Progress value={subject.percentage} className="flex-1 mr-2 h-2" />
                <span className="text-xs font-medium text-gray-700">
                  {subject.attended}/{subject.total}
                </span>
              </div>
              {subject.percentage < 80 && (
                <div className="flex items-center mt-2 p-2 bg-red-50 rounded-md">
                  <AlertTriangle className="w-3 h-3 text-red-500 mr-1" />
                  <p className="text-xs text-red-600 font-medium">
                    Below required attendance threshold
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Attendance */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Recent Attendance</h2>
        <div className="space-y-2">
          {recentAttendance.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{record.subject}</p>
                <p className="text-xs text-gray-600">{record.date} • {record.time}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${getAttendanceStatusColor(record.status)}`}>
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
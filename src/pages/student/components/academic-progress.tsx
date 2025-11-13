import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { TrendingUp, Award, BookOpen, Target } from "lucide-react";

export function AcademicProgress() {
  const subjects = [
    { name: "Mathematics", grade: "A-", percentage: 88, credits: 4, color: "bg-green-500" },
    { name: "Physics", grade: "B+", percentage: 85, credits: 4, color: "bg-blue-500" },
    { name: "Chemistry", grade: "A", percentage: 92, credits: 3, color: "bg-purple-500" },
    { name: "English", grade: "B", percentage: 82, credits: 3, color: "bg-orange-500" },
    { name: "History", grade: "A-", percentage: 87, credits: 3, color: "bg-red-500" },
    { name: "Biology", grade: "B+", percentage: 86, credits: 4, color: "bg-teal-500" },
  ];

  const semesterStats = {
    currentGPA: 3.8,
    creditHours: 21,
    completedCredits: 45,
    totalCredits: 120,
  };

  const upcomingAssignments = [
    { subject: "Mathematics", assignment: "Calculus Problem Set", dueDate: "Sep 20", status: "pending" },
    { subject: "Physics", assignment: "Lab Report #3", dueDate: "Sep 22", status: "pending" },
    { subject: "English", assignment: "Essay on Literature", dueDate: "Sep 25", status: "draft" },
    { subject: "Chemistry", assignment: "Molecular Structure Quiz", dueDate: "Sep 18", status: "urgent" },
  ];

  return (
    <div className="space-y-3">
      {/* Header (standardized height and spacing like Overview) */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-base">Academic Progress</h1>
            <p className="text-white/80 mt-1 text-sm">Fall Semester 2025</p>
          </div>
        </div>
      </div>

      {/* GPA and Credits Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-4 text-center shadow-sm border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="w-10 h-10 bg-[#647FBC]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Award className="w-5 h-5 text-[#647FBC]" />
          </div>
          <p className="text-sm font-bold text-[#647FBC] mb-1">{semesterStats.currentGPA}</p>
          <p className="text-gray-600 text-xs">Current GPA</p>
        </Card>
        <Card className="p-4 text-center shadow-sm border-0 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="w-10 h-10 bg-[#647FBC]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-[#647FBC]" />
          </div>
          <p className="text-sm font-bold text-[#647FBC] mb-1">{semesterStats.creditHours}</p>
          <p className="text-gray-600 text-xs">Credit Hours</p>
        </Card>
        <Card className="p-4 text-center shadow-sm border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="w-10 h-10 bg-[#647FBC]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-[#647FBC]" />
          </div>
          <p className="text-sm font-bold text-[#647FBC] mb-1">{semesterStats.completedCredits}</p>
          <p className="text-gray-600 text-xs">Completed Credits</p>
        </Card>
        <Card className="p-4 text-center shadow-sm border-0 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="w-10 h-10 bg-[#647FBC]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-[#647FBC]" />
          </div>
          <p className="text-sm font-bold text-[#647FBC] mb-1">{Math.round((semesterStats.completedCredits / semesterStats.totalCredits) * 100)}%</p>
          <p className="text-gray-600 text-xs">Complete</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Subject Grades - spans 2 columns */}
        <div className="lg:col-span-2">
          <Card className="p-3 shadow-sm border-0">
            <h2 className="font-semibold mb-3 text-[#647FBC] text-sm">Current Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {subjects.map((subject, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${subject.color} mr-2`}></div>
                      <span className="font-semibold text-gray-900 text-sm">{subject.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#647FBC]">{subject.grade}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <Progress value={subject.percentage} className="flex-1 mr-3 h-2" />
                    <span className="font-medium text-gray-700 text-xs">{subject.percentage}%</span>
                  </div>
                  <p className="text-gray-500 text-xs">{subject.credits} credits</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-3">
          {/* Degree Progress */}
          <Card className="p-3 shadow-sm border-0">
            <h2 className="font-semibold mb-3 text-[#647FBC] text-sm">Degree Progress</h2>
            <div className="space-y-3">
              <div className="flex justify-between font-medium text-sm">
                <span className="text-gray-700">Completed Credits</span>
                <span className="text-[#647FBC]">{semesterStats.completedCredits}/{semesterStats.totalCredits}</span>
              </div>
              <Progress 
                value={(semesterStats.completedCredits / semesterStats.totalCredits) * 100} 
                className="h-2"
              />
              <div className="text-center">
                <p className="text-sm font-bold text-[#647FBC] mb-1">
                  {Math.round((semesterStats.completedCredits / semesterStats.totalCredits) * 100)}%
                </p>
                <p className="text-gray-600 text-xs">Complete</p>
              </div>
            </div>
          </Card>

          {/* Upcoming Assignments */}
          <Card className="p-3 shadow-sm border-0">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-2">
                <BookOpen className="w-4 h-4 text-[#647FBC]" />
              </div>
              <h2 className="font-semibold text-[#647FBC] text-sm">Upcoming Assignments</h2>
            </div>
            <div className="space-y-2">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="p-2 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
                  <div className="mb-2">
                    <p className="font-semibold text-gray-900 text-sm">{assignment.assignment}</p>
                    <p className="text-gray-600 mt-0.5 text-xs">{assignment.subject}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-xs">{assignment.dueDate}</p>
                    <span className={`px-2 py-1 rounded-full font-medium text-xs ${
                      assignment.status === 'urgent' ? 'bg-red-100 text-red-700' :
                      assignment.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
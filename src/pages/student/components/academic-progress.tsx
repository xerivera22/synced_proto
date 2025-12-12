import Banner from "@/components/shared/Banner";
import { Award, BookOpen, Calendar, Target, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

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

  const completionPercent = Math.round(
    (semesterStats.completedCredits / semesterStats.totalCredits) * 100,
  );

  const summaryCards = [
    {
      label: "Current GPA",
      value: semesterStats.currentGPA.toFixed(1),
      subtext: "On track",
      icon: TrendingUp,
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
      iconClass: "text-emerald-700",
    },
    {
      label: "Credit Hours",
      value: String(semesterStats.creditHours),
      subtext: "This semester",
      icon: Target,
      containerClass: "border-sky-100 bg-sky-50",
      labelClass: "text-sky-700",
      iconClass: "text-sky-700",
    },
    {
      label: "Completed Credits",
      value: String(semesterStats.completedCredits),
      subtext: "Total earned",
      icon: BookOpen,
      containerClass: "border-indigo-100 bg-indigo-50",
      labelClass: "text-indigo-700",
      iconClass: "text-indigo-700",
    },
    {
      label: "Degree Progress",
      value: `${completionPercent}%`,
      subtext: "Overall completion",
      icon: Award,
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
      iconClass: "text-amber-700",
    },
  ];

  const upcomingAssignments = [
    {
      subject: "Mathematics",
      assignment: "Calculus Problem Set",
      dueDate: "Sep 20",
      status: "pending",
    },
    { subject: "Physics", assignment: "Lab Report #3", dueDate: "Sep 22", status: "pending" },
    { subject: "English", assignment: "Essay on Literature", dueDate: "Sep 25", status: "draft" },
    {
      subject: "Chemistry",
      assignment: "Molecular Structure Quiz",
      dueDate: "Sep 18",
      status: "urgent",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Banner
        title="Academic Progress"
        subtitle="Track your grades, subjects, and degree completion."
      />

      {/* GPA and Credits Overview */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.label}
              className={`p-5 ${card.containerClass} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-xs font-semibold uppercase tracking-wide ${card.labelClass}`}>
                  {card.label}
                </p>
                <Icon className={`h-4 w-4 ${card.iconClass}`} />
              </div>
              <div>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
                <p className="text-xs text-slate-600">{card.subtext}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Subject Grades - spans 2 columns */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                </div>
                <h2 className="font-semibold text-slate-800 text-sm">Subjects</h2>
              </div>
              <span className="text-xs text-slate-500">This Semester</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                      <span className="font-semibold text-slate-900 text-sm">{subject.name}</span>
                    </div>
                    <span className="text-lg font-bold text-indigo-600">{subject.grade}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Progress value={subject.percentage} className="flex-1 h-2" />
                      <span className="font-medium text-slate-700 text-xs w-10 text-right">{subject.percentage}%</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-500 text-xs">{subject.credits} credits</span>
                      <span className={`text-xs font-medium ${subject.percentage >= 90 ? 'text-emerald-600' : subject.percentage >= 80 ? 'text-blue-600' : 'text-amber-600'}`}>
                        {subject.percentage >= 90 ? 'Excellent' : subject.percentage >= 80 ? 'Good' : 'Needs Work'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-3">
          {/* Degree Progress */}
          <Card className="p-6">
            <h2 className="font-semibold mb-3 text-[#647FBC] text-sm">Degree Progress</h2>
            <div className="space-y-3">
              <div className="flex justify-between font-medium text-sm">
                <span className="text-gray-700">Completed Credits</span>
                <span className="text-[#647FBC]">
                  {semesterStats.completedCredits}/{semesterStats.totalCredits}
                </span>
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
          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                </div>
                <h2 className="font-semibold text-slate-800 text-sm">Assignments</h2>
              </div>
              <span className="text-xs text-slate-500">Due Soon</span>
            </div>
            <div className="space-y-3">
              {upcomingAssignments.map((assignment, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">{assignment.assignment}</p>
                      <p className="text-slate-500 mt-0.5 text-xs">{assignment.subject}</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full font-medium text-xs ${assignment.status === "urgent"
                        ? "bg-red-100 text-red-700"
                        : assignment.status === "draft"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {assignment.status}
                    </span>
                  </div>
                  <div className="flex items-center pt-2 border-t border-slate-100">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                    <span className="font-medium text-slate-600 text-xs">{assignment.dueDate}</span>
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

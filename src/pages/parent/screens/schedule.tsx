import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useState } from "react";
import { getParentPortalDate } from "../utils/date";

const ParentSchedule = () => {
  const dateLabel = getParentPortalDate();
  const [activeDay, setActiveDay] = useState("Monday");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Mock schedule data - simplified for parents
  const scheduleData: Record<string, Array<{ time: string; subject: string; teacher: string; room: string; color: string }>> = {
    Monday: [
      { time: "08:00 AM - 09:30 AM", subject: "Mathematics", teacher: "Mr. Thompson", room: "Room 204", color: "bg-blue-50 border-blue-100 text-blue-700" },
      { time: "09:45 AM - 11:15 AM", subject: "English Literature", teacher: "Ms. Rivera", room: "Room 118", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
      { time: "12:00 PM - 01:30 PM", subject: "Science", teacher: "Dr. Chen", room: "Lab 3", color: "bg-amber-50 border-amber-100 text-amber-700" },
    ],
    Tuesday: [
      { time: "08:00 AM - 09:30 AM", subject: "History", teacher: "Mr. Peters", room: "Room 107", color: "bg-purple-50 border-purple-100 text-purple-700" },
      { time: "09:45 AM - 11:15 AM", subject: "Physical Education", teacher: "Coach Wells", room: "Gymnasium", color: "bg-orange-50 border-orange-100 text-orange-700" },
      { time: "12:00 PM - 01:30 PM", subject: "Art", teacher: "Ms. Davis", room: "Art Studio", color: "bg-pink-50 border-pink-100 text-pink-700" },
    ],
    Wednesday: [
      { time: "08:00 AM - 09:30 AM", subject: "Mathematics", teacher: "Mr. Thompson", room: "Room 204", color: "bg-blue-50 border-blue-100 text-blue-700" },
      { time: "09:45 AM - 11:15 AM", subject: "Computer Science", teacher: "Mr. Lee", room: "Comp Lab", color: "bg-cyan-50 border-cyan-100 text-cyan-700" },
      { time: "12:00 PM - 01:30 PM", subject: "Science", teacher: "Dr. Chen", room: "Lab 3", color: "bg-amber-50 border-amber-100 text-amber-700" },
    ],
    Thursday: [
      { time: "08:00 AM - 09:30 AM", subject: "History", teacher: "Mr. Peters", room: "Room 107", color: "bg-purple-50 border-purple-100 text-purple-700" },
      { time: "09:45 AM - 11:15 AM", subject: "English Literature", teacher: "Ms. Rivera", room: "Room 118", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
      { time: "12:00 PM - 01:30 PM", subject: "Music", teacher: "Mrs. White", room: "Music Room", color: "bg-rose-50 border-rose-100 text-rose-700" },
    ],
    Friday: [
      { time: "08:00 AM - 09:30 AM", subject: "Mathematics", teacher: "Mr. Thompson", room: "Room 204", color: "bg-blue-50 border-blue-100 text-blue-700" },
      { time: "09:45 AM - 11:15 AM", subject: "Science", teacher: "Dr. Chen", room: "Lab 3", color: "bg-amber-50 border-amber-100 text-amber-700" },
      { time: "12:00 PM - 01:00 PM", subject: "Homeroom", teacher: "Mr. Thompson", room: "Room 204", color: "bg-slate-50 border-slate-100 text-slate-700" },
    ],
  };

  return (
    <div className="space-y-6">
      <Banner
        title="School Schedule"
        subtitle="View your child's weekly class schedule"
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        {/* Day Selection Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`
                whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all
                ${activeDay === day
                  ? "bg-[#647FBC] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}
              `}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          <div className="flex items-center mb-2">
            <Calendar className="w-4 h-4 text-[#647FBC] mr-2" />
            <h3 className="text-base font-semibold text-slate-900">{activeDay}'s Classes</h3>
          </div>

          {scheduleData[activeDay]?.map((item, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-sm
                bg-white border-slate-200
              `}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.color.replace('bg-', 'bg-').split(' ')[0].replace('50', '500')}`}></div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pl-3">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-800">{item.subject}</h4>
                  <div className="flex items-center text-sm text-slate-500">
                    <User className="w-3.5 h-3.5 mr-1.5" />
                    {item.teacher}
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-1">
                  <div className="flex items-center text-sm font-medium text-slate-700">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-[#647FBC]" />
                    {item.time}
                  </div>
                  <div className="flex items-center text-xs text-slate-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.room}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ParentSchedule;

import Card from '@/components/shared/Card';
import { Calendar, Clock, BookOpenCheck, TimerReset } from 'lucide-react';

export default function TeacherSchedule() {
  return (
    <div className="space-y-3">
      {/* Title banner */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Schedule</h1>
            <p className="text-white/80 text-sm mt-0.5">View and manage your timetable</p>
          </div>
        </div>
      </div>
      {/* KPI tiles matching student card style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center bg-[#647FBC]/10 border-[#647FBC]/20">
          <Calendar className="w-5 h-5 mx-auto mb-2 text-[#647FBC]" />
          <p className="text-sm font-semibold mb-1">4</p>
          <p className="text-gray-600 text-xs">Classes Today</p>
        </Card>
        <Card className="p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center bg-emerald-50 border-emerald-100">
          <BookOpenCheck className="w-5 h-5 mx-auto mb-2 text-emerald-600" />
          <p className="text-sm font-semibold mb-1">1</p>
          <p className="text-gray-600 text-xs">Free Periods</p>
        </Card>
        <Card className="p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center bg-orange-50 border-orange-100">
          <Clock className="w-5 h-5 mx-auto mb-2 text-orange-600" />
          <p className="text-sm font-semibold mb-1">5h</p>
          <p className="text-gray-600 text-xs">Hours Teaching</p>
        </Card>
        <Card className="p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center bg-sky-50 border-sky-100">
          <TimerReset className="w-5 h-5 mx-auto mb-2 text-sky-600" />
          <p className="text-sm font-semibold mb-1">11:00 AM</p>
          <p className="text-gray-600 text-xs">Next Class</p>
        </Card>
      </div>

      {/* Today’s schedule list */}
      <Card className="p-4 bg-[#647FBC]/5 border-[#647FBC]/15">
        <h2 className="font-semibold text-sm mb-3">Today’s Schedule</h2>
        <div className="space-y-2">
          {[
            { subject: 'Mathematics', time: '09:00 AM', room: 'Room 201' },
            { subject: 'Physics', time: '11:00 AM', room: 'Lab 3' },
            { subject: 'English', time: '02:00 PM', room: 'Room 105' },
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium text-sm">{c.subject}</p>
                <p className="text-gray-600 mt-0.5 text-xs">{c.room}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#647FBC] text-xs">{c.time}</p>
                <div className="flex items-center text-gray-500 mt-0.5">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="text-xs">50 min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

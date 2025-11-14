import Card from '@/components/shared/Card';
import { Link } from 'react-router-dom';
import { Table } from 'lucide-react';

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
      <Card className="p-4 bg-[#647FBC]/5 border-[#647FBC]/15">
        <h2 className="font-semibold text-sm mb-2">Subjects</h2>
        <p className="text-sm text-gray-600 mb-2">Select a subject to manage Overview, Class Records, Attendance, and more.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1,2,3].map((id) => (
            <Card key={id} className="p-3 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Sample Subject {id}</div>
                  <div className="text-xs text-gray-600">Section A • 30 students</div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/teacher/subjects/${id}`} className="px-2 py-1 text-xs border rounded-md hover:bg-gray-50">Open</Link>
                  <Link to={`/teacher/subjects/${id}?tab=class-records`} className="px-2 py-1 text-xs border rounded-md hover:bg-gray-50">Class Records</Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

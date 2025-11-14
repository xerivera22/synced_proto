import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Card from '@/components/shared/Card';
import { BookOpen } from 'lucide-react';

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'class-records', label: 'Class Records' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'materials', label: 'Materials' },
  { key: 'settings', label: 'Settings' },
] as const;

type TabKey = typeof tabs[number]['key'];

export default function SubjectDetail() {
  const { id } = useParams();
  const [search, setSearch] = useSearchParams();
  const activeParam = (search.get('tab') as TabKey) || 'overview';
  const [active, setActive] = useState<TabKey>(activeParam);

  // Keep URL in sync when tab changes
  function setTab(next: TabKey) {
    setActive(next);
    setSearch((prev) => {
      const s = new URLSearchParams(prev);
      s.set('tab', next);
      return s;
    }, { replace: true });
  }

  const subject = useMemo(() => ({ id, name: 'Sample Subject', section: 'A', roster: 30 }), [id]);

  // Remember last opened subject id for deep links (e.g., Class Records)
  useEffect(() => {
    if (id) {
      try {
        localStorage.setItem('teacher.lastSubjectId', id);
      } catch (e) {
        // ignore persistence errors
      }
    }
  }, [id]);

  return (
    <div className="space-y-3">
      {/* Title banner (student-style) */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">{subject.name}</h1>
            <p className="text-white/80 text-sm mt-0.5">Manage Overview, Class Records, Attendance and Materials</p>
          </div>
        </div>
      </div>
      <Card className="p-4 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-semibold text-sm">{subject.name} — Section {subject.section}</h2>
            <p className="text-xs text-gray-600">Subject ID: {id} • {subject.roster} students</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/teacher/subjects/${id}?tab=class-records`} className="px-2 py-1 text-xs border rounded-md hover:bg-gray-50">Class Records</Link>
            <Link to="/teacher/subjects" className="px-2 py-1 text-xs border rounded-md hover:bg-gray-50">Back</Link>
          </div>
        </div>
      </Card>

      <Card className="p-0">
        <div className="flex gap-1 px-2 pt-2 border-b border-gray-200">
          {tabs.map(t => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-3 py-2 text-xs rounded-t-md ${active === t.key ? 'bg-white border border-gray-200 border-b-transparent -mb-px' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="p-3">
          {active === 'overview' && <OverviewTab />}
          {active === 'class-records' && <ClassRecordsTab />}
          {active === 'attendance' && <AttendanceTab />}
          {active === 'materials' && <MaterialsTab />}
          {active === 'settings' && <SettingsTab />}
        </div>
      </Card>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-3 text-sm">
      <p>Quick summary for the selected subject. Add KPIs, upcoming assessments, and reminders here.</p>
      {/* KPI cards styled like student dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{label:'To Grade',value:12,color:'text-emerald-600'},{label:'Avg Score',value:'87%',color:'text-[#647FBC]'},
          {label:'Absences',value:3,color:'text-orange-600'},{label:'Students',value:30,color:'text-sky-600'}].map((k,i)=> (
          <Card
            key={i}
            className={
              "p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center " +
              (k.label === 'To Grade'
                ? 'bg-emerald-50 border-emerald-100 '
                : k.label === 'Avg Score'
                ? 'bg-[#647FBC]/10 border-[#647FBC]/20 '
                : k.label === 'Absences'
                ? 'bg-orange-50 border-orange-100 '
                : 'bg-sky-50 border-sky-100 ')
            }
          >
            <div className={`w-5 h-5 mb-2 ${k.color}`}>●</div>
            <p className="text-sm font-semibold mb-1">{k.value}</p>
            <p className="text-gray-600 text-xs">{k.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ClassRecordsTab() {
  // Minimal table placeholder to represent the old Gradebook screen
  const rows = [
    { id: 1, student: 'John Doe', quiz1: 15, quiz2: 18, midterm: 85 },
    { id: 2, student: 'Jane Smith', quiz1: 19, quiz2: 17, midterm: 91 },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Class Records</h3>
        <div className="flex gap-2">
          <button className="px-2 py-1 text-xs border rounded-md hover:bg-gray-50">Export CSV</button>
          <button className="px-2 py-1 text-xs border rounded-md hover:bg-gray-50">Add Assessment</button>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="min-w-[600px] w-full text-sm border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-1 text-left border-b">Student</th>
              <th className="px-2 py-1 text-left border-b">Quiz 1</th>
              <th className="px-2 py-1 text-left border-b">Quiz 2</th>
              <th className="px-2 py-1 text-left border-b">Midterm</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-2 py-1 border-b">{r.student}</td>
                <td className="px-2 py-1 border-b">{r.quiz1}</td>
                <td className="px-2 py-1 border-b">{r.quiz2}</td>
                <td className="px-2 py-1 border-b">{r.midterm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AttendanceTab() {
  return <p className="text-sm text-gray-600">Attendance tools for this subject will appear here.</p>;
}

function MaterialsTab() {
  return <p className="text-sm text-gray-600">Upload or link class materials.</p>;
}

function SettingsTab() {
  return <p className="text-sm text-gray-600">Subject-specific settings like grading scheme and visibility.</p>;
}

import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";
import { Calendar, ClipboardCheck, FileText, MessageSquare } from "lucide-react";
import { useMemo, useState } from "react";

const QuickActionModal = ({
  action,
  onClose,
}: {
  action: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
        >
          &times;
        </button>
        <h3 className="text-2xl font-semibold text-slate-900 mb-6">{action}</h3>
        <p className="text-slate-600">
          This is a placeholder modal for the "{action}" action. You can add the specific functionality here.
        </p>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TeacherOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  const kpis = useMemo(
    () => [
      {
        label: "Classes Today",
        value: "4",
        description: "Scheduled sessions",
        icon: Calendar,
        containerClass: "border-indigo-100 bg-indigo-50",
        labelClass: "text-indigo-700",
        iconClass: "text-indigo-700",
      },
      {
        label: "To Grade",
        value: "12",
        description: "Assignments pending",
        icon: ClipboardCheck,
        containerClass: "border-emerald-100 bg-emerald-50",
        labelClass: "text-emerald-700",
        iconClass: "text-emerald-700",
      },
      {
        label: "Attendance Pending",
        value: "2",
        description: "Classes awaiting review",
        icon: FileText,
        containerClass: "border-amber-100 bg-amber-50",
        labelClass: "text-amber-700",
        iconClass: "text-amber-700",
      },
      {
        label: "Unread Messages",
        value: "5",
        description: "From parents & staff",
        icon: MessageSquare,
        containerClass: "border-sky-100 bg-sky-50",
        labelClass: "text-sky-700",
        iconClass: "text-sky-700",
      },
    ],
    [],
  );

  const date = "Tuesday, Sept 16, 2025";

  const handleOpenModal = (action: string) => {
    setSelectedAction(action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAction("");
  };

  return (
    <div className="space-y-3">
      <Banner
        title="Welcome back, Teacher!"
        subtitle="Your class tasks today"
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{date}</p>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {kpis.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={`p-5 ${stat.containerClass} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-xs font-semibold uppercase tracking-wide ${stat.labelClass}`}>
                  {stat.label}
                </p>
                <Icon className={`h-4 w-4 ${stat.iconClass}`} />
              </div>
              <div>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-600">{stat.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
            <p className="text-sm text-slate-500">Jump into common teaching workflows.</p>
          </div>
        </header>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {["Take Attendance", "Enter Grades", "Create Schedule"].map((action) => (
            <div
              key={action}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">{action}</span>
                <button
                  type="button"
                  onClick={() => handleOpenModal(action)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {isModalOpen && <QuickActionModal action={selectedAction} onClose={handleCloseModal} />}
    </div>
  );
}

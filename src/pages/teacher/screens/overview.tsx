import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";
import { Calendar, ClipboardCheck, FileText, MessageSquare } from "lucide-react";
import { useMemo, useState } from "react";
import { getTeacherPortalDate } from "../utils/date";

const QuickActionModal = ({
  action,
  onClose,
}: {
  action: string;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Submitting for ${action}:`, formData);
    onClose();
  };

  const renderFormContent = () => {
    switch (action) {
      case "Take Attendance":
        return (
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              id="class"
              name="class"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
            >
              <option>Math 101</option>
              <option>History 202</option>
              <option>Science 9</option>
            </select>
          </div>
        );
      case "Enter Grades":
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <select
                id="class"
                name="class"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
              >
                <option>English Lit</option>
                <option>Physics I</option>
              </select>
            </div>
            <div>
              <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-2">
                Select Student
              </label>
              <select
                id="student"
                name="student"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
              >
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
            </div>
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                Grade
              </label>
              <input
                type="text"
                id="grade"
                name="grade"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
                placeholder="e.g., A+, 95, etc."
              />
            </div>
          </div>
        );
      case "Make Announcement":
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                Target Class
              </label>
              <select
                id="class"
                name="class"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
              >
                <option>Math 101</option>
                <option>History 202</option>
                <option>Science 9</option>
              </select>
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
                placeholder="e.g., Exam Rescheduled"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
                placeholder="Type your announcement here..."
              />
            </div>
          </div>
        );
      case "Create Schedule":
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
                placeholder="e.g., Staff Meeting"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-slate-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        );
      default:
        return <p>No action configured.</p>;
    }
  };

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

        <form onSubmit={handleSubmit}>
          <div className="mb-6">{renderFormContent()}</div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-slate-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default function TeacherOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const dateLabel = getTeacherPortalDate();

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
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
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
          {["Take Attendance", "Enter Grades", "Make Announcement"].map((action) => (
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

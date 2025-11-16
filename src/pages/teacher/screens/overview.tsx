import { Calendar, ClipboardCheck, FileText, MessageSquare } from "lucide-react";
import { useMemo } from "react";
import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";

export default function TeacherOverview() {
  const kpis = useMemo(
    () => [
      { label: "Classes Today", value: 4, icon: Calendar, color: "text-[#647FBC]" },
      { label: "To Grade", value: 12, icon: ClipboardCheck, color: "text-emerald-600" },
      { label: "Attendance Pending", value: 2, icon: FileText, color: "text-orange-600" },
      { label: "Unread Messages", value: 5, icon: MessageSquare, color: "text-sky-600" },
    ],
    [],
  );

  const date = "Tuesday, Sept 16, 2025";

  return (
    <div className="space-y-3">
      <Banner
        title="Welcome back, Teacher!"
        subtitle="Your class tasks today"
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{date}</p>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <Card
              key={i}
              className={
                "p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center " +
                (k.label === "Classes Today"
                  ? "bg-[#647FBC]/10 border-[#647FBC]/20 "
                  : k.label === "To Grade"
                    ? "bg-emerald-50 border-emerald-100 "
                    : k.label === "Attendance Pending"
                      ? "bg-orange-50 border-orange-100 "
                      : "bg-sky-50 border-sky-100 ")
              }
            >
              <Icon className={`w-5 h-5 mx-auto mb-2 ${k.color}`} />
              <p className="text-sm font-semibold mb-1">{k.value}</p>
              <p className="text-gray-600 text-xs">{k.label}</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-4 bg-[#647FBC]/5 border-[#647FBC]/15">
        <h2 className="font-semibold text-sm mb-2">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          {["Take Attendance", "Enter Grades", "Create Schedule"].map((a) => (
            <button
              key={a}
              className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
              type="button"
            >
              {a}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

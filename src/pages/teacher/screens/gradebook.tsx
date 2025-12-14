import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";
import { getTeacherPortalDate } from "../utils/date";

export default function TeacherGradebook() {
  const dateLabel = getTeacherPortalDate();

  return (
    <div className="space-y-3">
      <Banner
        title="Gradebook"
        subtitle="Manage student grades and academic records"
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <h2 className="text-base font-semibold text-slate-900">Gradebook</h2>
        <p className="mt-2 text-sm text-slate-500">
          Enter or adjust grades, set grading scale, publish results.
        </p>
      </Card>
    </div>
  );
}

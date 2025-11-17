import Card from "@/components/shared/Card";

export default function TeacherGradebook() {
  return (
    <div className="space-y-3">
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <h2 className="text-base font-semibold text-slate-900">Gradebook</h2>
        <p className="mt-2 text-sm text-slate-500">
          Enter or adjust grades, set grading scale, publish results.
        </p>
      </Card>
    </div>
  );
}

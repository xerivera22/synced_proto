import Card from "@/components/shared/Card";

export default function TeacherGradebook() {
  return (
    <div className="space-y-3">
      <Card className="p-4">
        <h2 className="font-semibold text-sm mb-2">Gradebook</h2>
        <p className="text-sm text-gray-600">
          Enter or adjust grades, set grading scale, publish results.
        </p>
      </Card>
    </div>
  );
}

import { ChevronDown, Clock, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { Card } from "./ui/card";

type DayKey = 0 | 1 | 2 | 3 | 4; // 0=Mon ... 4=Fri

export type ScheduleItem = {
    day: DayKey;
    subject_name: string;
    start_time: string; // HH:MM (24h)
    end_time: string; // HH:MM (24h)
    room: string;
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function toMinutes(time: string): number {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

function calculateDaySummary(items: ScheduleItem[]) {
    const subjectCount = items.length;
    const totalMinutes = items.reduce((sum, item) => sum + (toMinutes(item.end_time) - toMinutes(item.start_time)), 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const displayText = minutes > 0 ? `${hours}h ${minutes}m • ${subjectCount} Subjects` : `${hours} hrs • ${subjectCount} Subjects`;
    return { subjectCount, totalMinutes, hours, minutes, displayText };
}

export function ScheduleOverview({ data }: { data: ScheduleItem[] }) {
    const [expandedDay, setExpandedDay] = useState<DayKey | null>(null);

    const byDay = useMemo(() => {
        const map: Record<DayKey, ScheduleItem[]> = { 0: [], 1: [], 2: [], 3: [], 4: [] };
        for (const item of data) {
            if (item.day in map) map[item.day as DayKey].push(item);
        }
        // Sort each day by start_time
        (Object.keys(map) as unknown as DayKey[]).forEach((d) => {
            map[d].sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time));
        });
        return map;
    }, [data]);

    const toggleDay = (day: DayKey) => setExpandedDay(expandedDay === day ? null : day);

    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Schedule Overview</h2>
            <div className="space-y-3">
                {DAYS.map((dayName, idx) => {
                    const day = idx as DayKey;
                    const items = byDay[day];
                    const summary = calculateDaySummary(items);
                    const isExpanded = expandedDay === day;
                    return (
                        <div key={day} className="border rounded-lg overflow-hidden transition-all">
                            <button
                                onClick={() => toggleDay(day)}
                                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-medium text-slate-900">{dayName}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                                        {summary.displayText}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                </div>
                            </button>
                            {isExpanded && (
                                <div className="border-t bg-slate-50 p-4 space-y-3">
                                    {items.length === 0 ? (
                                        <p className="text-sm text-slate-500 text-center py-2">No classes scheduled</p>
                                    ) : (
                                        items.map((item, i) => (
                                            <div key={`${item.subject_name}-${i}`} className="bg-white p-3 rounded-lg border border-slate-200 flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-medium text-slate-900">{item.subject_name}</h4>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {item.start_time} - {item.end_time}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" />
                                                            {item.room}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

/*
Explanation: Total hours per day are computed by converting each class's start_time and end_time
into minutes since midnight, subtracting to get the duration in minutes, summing across the day,
and finally converting back into hours and minutes for the badge (e.g., "5 hrs • 3 Subjects").
This ensures accurate results even across varying start/end times.
*/

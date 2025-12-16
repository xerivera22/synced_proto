import Banner from "@/components/shared/Banner";
import { announcementService } from "@/services/announcementService";
import { eventService } from "@/services/eventService";
import { studentProfileService } from "@/services/studentProfileService";
import {
    ArrowUpRight,
    ClipboardList,
    GraduationCap,
    Megaphone,
} from "lucide-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { paymentSummaries } from "../data/mockData";
import { getAdminPortalDate } from "../utils/date";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  audience: string;
  status: string;
}

interface Announcement {
  _id: string;
  id: string;
  title: string;
  target: string;
  scheduledFor: string;
  status: string;
}

const AdminDashboard: FC = () => {
  const dateLabel = getAdminPortalDate();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Debug: Version indicator for deployment verification
  useEffect(() => {
    console.log("🚀 SyncED Admin Dashboard v2.1 - Real Data Mode");
  }, []);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        console.log("📊 Fetching student count from API...");
        const students = await studentProfileService.getStudentProfiles();
        console.log("✅ Students fetched:", students.length);
        setStudentCount(students.length);
      } catch (error) {
        console.error("❌ Failed to fetch student count:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentCount();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setUpcomingEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await announcementService.getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  // Calculate scheduled announcements
  const scheduledAnnouncements = announcements.filter(a => a.status === "Scheduled").length;

  const summaryCards = [
    {
      title: "Active Students",
      value: loading ? "..." : studentCount.toLocaleString(),
      change: loading ? "Loading..." : "Enrolled in database",
      icon: GraduationCap,
      to: "/admin/students",
      containerClass: "border-sky-100 bg-sky-50",
      changeClass: "text-sky-700",
      iconClass: "bg-white/70 text-sky-700",
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.length.toString(),
      change: `${upcomingEvents.length} registered`,
      icon: ClipboardList,
      to: "/admin/events",
      containerClass: "border-amber-100 bg-amber-50",
      changeClass: "text-amber-700",
      iconClass: "bg-white/70 text-amber-700",
    },
    {
      title: "Announcements",
      value: announcements.length.toString(),
      change: `${scheduledAnnouncements} scheduled`,
      icon: Megaphone,
      to: "/admin/events",
      containerClass: "border-purple-100 bg-purple-50",
      changeClass: "text-purple-700",
      iconClass: "bg-white/70 text-purple-700",
    },
  ];

  return (
    <div className="space-y-8">
      <Banner
        title="Admin Overview"
        right={
          <p className="text-white/80 text-xs md:text-sm whitespace-nowrap">
            {dateLabel}
          </p>
        }
        subtitle="Monitor student performance, upcoming events, and school-wide communications."
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map(
          ({
            title,
            value,
            change,
            icon: Icon,
            to,
            containerClass,
            changeClass,
            iconClass,
          }) => (
            <Link
              key={title}
              to={to}
              className={`group rounded-2xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow md:p-7 ${containerClass}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{title}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                    {value}
                  </h3>
                  <p className={`mt-1 text-xs ${changeClass}`}>{change}</p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${iconClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-1 text-sm text-gray-700">
                View details
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          )
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Events
              </h2>
              <p className="text-sm text-gray-500">
                Stay on top of planning and approvals
              </p>
            </div>
            <Link
              to="/admin/events"
              className="rounded-full border border-sky-200 px-3 py-1 text-xs font-medium text-sky-700 hover:bg-white/60"
            >
              Manage
            </Link>
          </header>
          <ul className="space-y-3">
            {upcomingEvents.map((event) => (
              <li
                key={event.id}
                className="rounded-xl border border-sky-100/60 bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Audience: {event.audience}
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Announcements
              </h2>
              <p className="text-sm text-gray-500">
                Track scheduled broadcasts
              </p>
            </div>
            <Link
              to="/admin/events"
              className="rounded-full border border-purple-200 px-3 py-1 text-xs font-medium text-purple-700 hover:bg-white/60"
            >
              Compose
            </Link>
          </header>
          <ul className="space-y-3">
            {announcements.slice(0, 3).map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-purple-100/60 bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Target: {item.target}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    {item.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Schedule: {item.scheduledFor}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Finance Snapshot
            </h2>
            <p className="text-sm text-gray-500">
              Billing overview for the current month
            </p>
          </div>
          <Link
            to="/admin/payments"
            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-white/60"
          >
            View ledger
          </Link>
        </header>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-blue-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-blue-800">
              Total Due
            </dt>
            <dd className="mt-2 text-lg font-semibold text-blue-900">
              ₱{paymentSummaries.totalDueThisMonth.toLocaleString()}
            </dd>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-emerald-800">
              Collected
            </dt>
            <dd className="mt-2 text-lg font-semibold text-emerald-900">
              ₱{paymentSummaries.collectedThisMonth.toLocaleString()}
            </dd>
          </div>
          <div className="rounded-xl bg-amber-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-amber-800">
              Overdue
            </dt>
            <dd className="mt-2 text-lg font-semibold text-amber-900">
              {paymentSummaries.overdueInvoices} invoices
            </dd>
          </div>
          <div className="rounded-xl bg-purple-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-purple-800">
              Scholarships
            </dt>
            <dd className="mt-2 text-lg font-semibold text-purple-900">
              {paymentSummaries.scholarshipsGranted} students
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
};

export default AdminDashboard;

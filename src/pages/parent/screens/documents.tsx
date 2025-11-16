import Banner from "@/components/shared/Banner";
import { getParentPortalDate } from "../utils/date";

const documents = [
  { name: "Report Card - Spring 2024", type: "PDF", size: "1.2 MB", updated: "Jun 15, 2024" },
  { name: "Immunization Records", type: "PDF", size: "540 KB", updated: "Apr 02, 2024" },
  { name: "Permission Slip - Field Trip", type: "PDF", size: "320 KB", updated: "Mar 12, 2024" },
  { name: "Transportation Waiver", type: "PDF", size: "220 KB", updated: "Jan 07, 2024" },
];

const ParentDocuments = () => {
  const dateLabel = getParentPortalDate();

  return (
    <div className="space-y-6">
      <Banner
        title="Documents"
        subtitle="Download academic records, forms, and school notices for your student."
        right={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-white/30 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/10 md:text-sm"
            >
              Upload
            </button>
            <button
              type="button"
              className="rounded-full border border-white/30 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/10 md:text-sm"
            >
              Request document
            </button>
          </div>
        }
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Document Library</h2>
            <p className="text-xs text-slate-500">Last updated {dateLabel}</p>
          </div>
        </header>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Updated
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {documents.map((doc) => (
                <tr key={doc.name}>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">{doc.name}</td>
                  <td className="px-4 py-4 text-sm text-slate-500">{doc.type}</td>
                  <td className="px-4 py-4 text-sm text-slate-500">{doc.size}</td>
                  <td className="px-4 py-4 text-sm text-slate-500">{doc.updated}</td>
                  <td className="px-4 py-4 text-right text-sm font-medium text-slate-600">
                    <button
                      type="button"
                      className="text-slate-600 transition hover:text-slate-900"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ParentDocuments;

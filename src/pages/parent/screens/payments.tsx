import Banner from "@/components/shared/Banner";
import { getParentPortalDate } from "../utils/date";

type PaymentSummaryItem = {
  label: string;
  value: string;
  containerClass: string;
  labelClass: string;
  valueClass?: string;
};

type PaymentStatus = "Completed" | "Pending" | "Failed";

type PaymentTransaction = {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: PaymentStatus;
};

const paymentSummary: PaymentSummaryItem[] = [
  {
    label: "Current Balance",
    value: "$1,240",
    containerClass: "border-amber-100 bg-amber-50",
    labelClass: "text-amber-700",
    valueClass: "text-amber-700",
  },
  {
    label: "Next Due Date",
    value: "Oct 01, 2024",
    containerClass: "border-sky-100 bg-sky-50",
    labelClass: "text-sky-700",
  },
  {
    label: "Auto-Pay",
    value: "Enabled",
    containerClass: "border-emerald-100 bg-emerald-50",
    labelClass: "text-emerald-700",
    valueClass: "text-emerald-700",
  },
  {
    label: "Last Payment",
    value: "$620 on Aug 01",
    containerClass: "border-indigo-100 bg-indigo-50",
    labelClass: "text-indigo-700",
  },
];

const transactions: PaymentTransaction[] = [
  {
    id: "INV-1021",
    date: "Aug 01, 2024",
    description: "Tuition Installment",
    amount: "$620.00",
    status: "Completed",
  },
  {
    id: "INV-1018",
    date: "Jul 01, 2024",
    description: "Tuition Installment",
    amount: "$620.00",
    status: "Completed",
  },
  {
    id: "INV-1015",
    date: "Jun 01, 2024",
    description: "Tuition Installment",
    amount: "$620.00",
    status: "Completed",
  },
];

const statusTone: Record<PaymentStatus, string> = {
  Completed: "text-emerald-600",
  Pending: "text-amber-600",
  Failed: "text-rose-600",
};

const ParentPayments = () => {
  const dateLabel = getParentPortalDate();

  return (
    <div className="space-y-6">
      <Banner
        title="Payments & Billing"
        subtitle="Review balances, upcoming dues, and recent transactions."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {paymentSummary.map((item) => (
          <article
            key={item.label}
            className={`rounded-2xl border p-6 shadow-sm ${item.containerClass}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wide ${item.labelClass}`}>
              {item.label}
            </p>
            <p className={`mt-3 text-2xl font-semibold ${item.valueClass ?? "text-slate-900"}`}>
              {item.value}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Payment History</h2>
            <p className="text-xs text-slate-500">
              View transactions, receipts, and upcoming schedules.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Make a payment
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Download statement
            </button>
          </div>
        </header>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Invoice
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">{txn.id}</td>
                  <td className="px-4 py-4 text-sm text-slate-500">{txn.date}</td>
                  <td className="px-4 py-4 text-sm text-slate-500">{txn.description}</td>
                  <td className="px-4 py-4 text-right text-sm font-medium text-slate-900">
                    {txn.amount}
                  </td>
                  <td
                    className={`px-4 py-4 text-right text-sm font-medium ${statusTone[txn.status]}`}
                  >
                    {txn.status}
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

export default ParentPayments;

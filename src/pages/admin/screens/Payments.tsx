import Banner from "@/components/shared/Banner";
import { paymentRecordService } from "@/services/paymentRecordService";
import { paymentSummaryService } from "@/services/paymentSummaryService";
import { useEffect, useState } from "react";
import { getAdminPortalDate } from "../utils/date";

interface PaymentRecord {
  _id: string;
  student: string;
  gradeLevel: string;
  amountDue: number;
  amountPaid: number;
  dueDate: string;
  status: "paid" | "partial" | "overdue";
}

interface PaymentSummary {
  totalDueThisMonth: number;
  collectedThisMonth: number;
  overdueInvoices: number;
  scholarshipsGranted: number;
}

const Payments = () => {
  const dateLabel = getAdminPortalDate();
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([]);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(
    null
  );

  useEffect(() => {
    paymentRecordService.getPaymentRecords().then(setPaymentRecords);
    paymentSummaryService.getPaymentSummary().then(setPaymentSummary);
  }, []);

  const metrics = [
    {
      label: "Total Due",
      value: `₱${paymentSummary?.totalDueThisMonth?.toLocaleString() ?? "0"}`,
      containerClass: "border-blue-100 bg-blue-50",
      chipClass: "bg-white/80 text-blue-800",
    },
    {
      label: "Collected",
      value: `₱${paymentSummary?.collectedThisMonth?.toLocaleString() ?? "0"}`,
      containerClass: "border-emerald-100 bg-emerald-50",
      chipClass: "bg-white/80 text-emerald-800",
    },
    {
      label: "Overdue Invoices",
      value: paymentSummary?.overdueInvoices ?? 0,
      containerClass: "border-amber-100 bg-amber-50",
      chipClass: "bg-white/80 text-amber-800",
    },
    {
      label: "Scholarships",
      value: paymentSummary?.scholarshipsGranted ?? 0,
      containerClass: "border-purple-100 bg-purple-50",
      chipClass: "bg-white/80 text-purple-800",
    },
  ];

  return (
    <div className="space-y-6">
      <Banner
        title="Payment Ledger"
        right={
          <p className="text-white/80 text-xs md:text-sm whitespace-nowrap">
            {dateLabel}
          </p>
        }
        subtitle="Monitor balances, collection progress, and scholarship allocations."
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <FinanceMetric
            key={metric.label}
            label={metric.label}
            value={metric.value}
            containerClass={metric.containerClass}
            chipClass={metric.chipClass}
          />
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Ledger Details
            </h2>
            <p className="text-sm text-slate-600">
              Monitor balances and follow-ups for this month.
            </p>
          </div>
        </header>

        <div className="mt-4 overflow-x-auto">
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Amount Due</th>
                  <th className="px-4 py-3">Amount Paid</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paymentRecords.map((payment) => (
                  <tr key={payment._id} className="bg-white">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">
                        {payment._id}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {payment.student}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {payment.gradeLevel}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                      ₱{payment.amountDue.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      ₱{payment.amountPaid.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={payment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paymentRecords.length === 0 && (
              <div className="py-8 text-center text-sm text-gray-500">
                No payment records found.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const FinanceMetric = ({
  label,
  value,
  containerClass,
  chipClass,
}: {
  label: string;
  value: string | number;
  containerClass: string;
  chipClass: string;
}) => {
  return (
    <div className={`rounded-2xl border p-6 shadow-sm ${containerClass}`}>
      <p className="text-sm text-slate-600">{label}</p>
      <span
        className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${chipClass}`}
      >
        {value}
      </span>
    </div>
  );
};

const StatusBadge = ({
  status,
}: {
  status: "paid" | "partial" | "overdue";
}) => {
  const className =
    status === "paid"
      ? "bg-emerald-50 text-emerald-700"
      : status === "partial"
        ? "bg-amber-50 text-amber-700"
        : "bg-rose-50 text-rose-700";
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${className}`}
    >
      {status}
    </span>
  );
};

export default Payments;

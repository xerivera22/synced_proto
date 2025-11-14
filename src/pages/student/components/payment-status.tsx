import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { CreditCard, DollarSign, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";

export function PaymentStatus() {
  const paymentSummary = {
    totalFees: 5000,
    paidAmount: 4750,
    pendingAmount: 250,
    nextDueDate: "Oct 15, 2025",
  };

  const feeStructure = [
    { category: "Tuition Fee", amount: 3500, status: "paid", dueDate: "Aug 15" },
    { category: "Lab Fee", amount: 500, status: "paid", dueDate: "Aug 15" },
    { category: "Library Fee", amount: 200, status: "paid", dueDate: "Aug 15" },
    { category: "Sports Fee", amount: 300, status: "paid", dueDate: "Sep 15" },
    { category: "Examination Fee", amount: 250, status: "pending", dueDate: "Oct 15" },
    { category: "Technology Fee", amount: 250, status: "paid", dueDate: "Sep 15" },
  ];

  const paymentHistory = [
    { date: "Sep 10, 2025", description: "Sports Fee", amount: 300, method: "Credit Card", status: "completed" },
    { date: "Sep 1, 2025", description: "Technology Fee", amount: 250, method: "Bank Transfer", status: "completed" },
    { date: "Aug 15, 2025", description: "Tuition Fee", amount: 3500, method: "Bank Transfer", status: "completed" },
    { date: "Aug 15, 2025", description: "Lab Fee", amount: 500, method: "Credit Card", status: "completed" },
    { date: "Aug 15, 2025", description: "Library Fee", amount: 200, method: "Credit Card", status: "completed" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-orange-600";
      case "overdue":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-3">
      {/* Header (standardized height and spacing like Overview) */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Payment Status</h1>
            <p className="text-white/80 text-sm mt-0.5">Academic Year 2025-26</p>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 text-center shadow-sm border-0 bg-gradient-to-br from-green-50 to-emerald-50 h-24 md:h-28 flex flex-col items-center justify-start pt-3 gap-1">
          <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
            <DollarSign className="w-3 h-3 text-green-600" />
          </div>
          <p className="text-sm font-semibold text-green-600 leading-tight">${paymentSummary.paidAmount}</p>
          <p className="text-xs text-gray-600 leading-tight">Paid Amount</p>
        </Card>
        <Card className="p-3 text-center shadow-sm border-0 bg-gradient-to-br from-orange-50 to-amber-50 h-24 md:h-28 flex flex-col items-center justify-start pt-3 gap-1">
          <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
            <AlertCircle className="w-3 h-3 text-orange-600" />
          </div>
          <p className="text-sm font-semibold text-orange-600 leading-tight">${paymentSummary.pendingAmount}</p>
          <p className="text-xs text-gray-600 leading-tight">Pending Amount</p>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Payment Progress</h2>
        <div className="space-y-3">
          <div className="flex justify-between font-medium text-sm">
            <span className="text-gray-700">Total Fees Paid</span>
            <span className="text-[#647FBC]">${paymentSummary.paidAmount}/${paymentSummary.totalFees}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#647FBC] to-[#5a73b3] h-2 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${(paymentSummary.paidAmount / paymentSummary.totalFees) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-[#647FBC]">95% Complete</span>
            <span className="text-gray-600">Next Due: {paymentSummary.nextDueDate}</span>
          </div>
        </div>
      </Card>

      {/* Pending Payments */}
      {paymentSummary.pendingAmount > 0 && (
        <Card className="p-3 border-orange-200 bg-orange-50">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-orange-800 text-sm">Pending Payment</h2>
            <Calendar className="w-4 h-4 text-orange-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-orange-800">Examination Fee</span>
              <span className="font-bold text-orange-800">${paymentSummary.pendingAmount}</span>
            </div>
            <p className="text-xs text-orange-700">Due Date: {paymentSummary.nextDueDate}</p>
            <Button className="w-full mt-2 bg-gradient-to-r from-[#647FBC] to-[#5a73b3] hover:from-[#5a73b3] hover:to-[#4d6aa3] text-white shadow-sm text-sm h-8">
              Pay Now
            </Button>
          </div>
        </Card>
      )}

      {/* Fee Structure */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Fee Structure</h2>
        <div className="space-y-2">
          {feeStructure.map((fee, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center mr-3 shadow-sm">
                  {getStatusIcon(fee.status)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{fee.category}</p>
                  <p className="text-xs text-gray-600">Due: {fee.dueDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">${fee.amount}</p>
                <p className={`text-xs capitalize font-medium ${getStatusColor(fee.status)}`}>
                  {fee.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment History */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Payment History</h2>
        <div className="space-y-2">
          {paymentHistory.map((payment, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center mr-3">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{payment.description}</p>
                  <p className="text-xs text-gray-600">{payment.date} • {payment.method}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-green-600">${payment.amount}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
import React from 'react';

// Minimal bottom navigation placeholder. Replace with rich version when icons library installed.
const BottomNavigation: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 text-xs">
      <a href="/student/overview" className="hover:text-indigo-600">Overview</a>
      <a href="/student/progress" className="hover:text-indigo-600">Progress</a>
      <a href="/student/attendance" className="hover:text-indigo-600">Attendance</a>
      <a href="/student/payments" className="hover:text-indigo-600">Payments</a>
      <a href="/student/profile" className="hover:text-indigo-600">Profile</a>
    </div>
  );
};

export default BottomNavigation;
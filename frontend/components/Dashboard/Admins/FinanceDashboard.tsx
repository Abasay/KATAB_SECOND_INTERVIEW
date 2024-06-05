// components/FinanceManager.tsx

import React from 'react';

const FinanceManager: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Finance Manager Dashboard</h1>
      <p className="mb-4">Welcome to the Finance Manager's dashboard. Here you can manage all financial records, generate reports, and oversee transactions.</p>
      <ul className="list-disc list-inside">
        <li className="mb-2">View Financial Reports</li>
        <li className="mb-2">Manage Transactions</li>
        <li className="mb-2">Budget Planning</li>
        <li className="mb-2">Expense Tracking</li>
      </ul>
    </div>
  );
}

export default FinanceManager;

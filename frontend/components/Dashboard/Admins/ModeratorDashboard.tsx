// components/Moderator.tsx

import React from 'react';

const Moderator: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Moderator Dashboard</h1>
      <p className="mb-4">Welcome to the Moderator's dashboard. Here you can manage user content, oversee community guidelines, and handle user reports.</p>
      <ul className="list-disc list-inside">
        <li className="mb-2">Review User Reports</li>
        <li className="mb-2">Manage Content</li>
        <li className="mb-2">Enforce Community Guidelines</li>
        <li className="mb-2">Ban/Unban Users</li>
      </ul>
    </div>
  );
}

export default Moderator;

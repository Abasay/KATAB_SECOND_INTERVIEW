// components/GeneralSecretary.tsx

import React from 'react';

const GeneralSecretary: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">General Secretary Dashboard</h1>
      <p className="mb-4">Welcome to the General Secretary's dashboard. Here you can manage administrative tasks, coordinate meetings, and communicate with members.</p>
      <ul className="list-disc list-inside">
        <li className="mb-2">Schedule Meetings</li>
        <li className="mb-2">Manage Correspondence</li>
        <li className="mb-2">Member Coordination</li>
        <li className="mb-2">Document Management</li>
      </ul>
    </div>
  );
}

export default GeneralSecretary;

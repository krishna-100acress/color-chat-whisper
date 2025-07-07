
import React from 'react';

const Leads = ({ userRole }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Leads Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Leads interface for {userRole}</p>
        <div className="mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leads;

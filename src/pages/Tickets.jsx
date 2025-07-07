
import React from 'react';

const Tickets = ({ userRole }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tickets Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Tickets interface for {userRole}</p>
        <div className="mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Create New Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tickets;


import React from 'react';

const UserManagement = ({ userRole }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">User management interface for {userRole}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Features:</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>View all users</li>
            <li>Edit user permissions</li>
            <li>Delete users</li>
            <li>Manage user roles</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;


import React from 'react';

const CreateUser = ({ userRole, userType }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create {userType}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Create new {userType} interface for {userRole}</p>
        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create {userType}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;

import React from 'react';

const Table: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">User Data</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">John Doe</td>
            <td className="border p-2">john@example.com</td>
            <td className="border p-2">Admin</td>
          </tr>
          <tr>
            <td className="border p-2">Jane Smith</td>
            <td className="border p-2">jane@example.com</td>
            <td className="border p-2">User</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;

import React, { useState } from 'react';
import { User } from '../../types/User';
import { FaEdit, FaTrash, FaEye, FaPlus, FaDownload } from 'react-icons/fa';

interface UserTableProps {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (userId: string) => void;
  onAdd: () => void;
  onExport: (user: any) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, onView, onAdd, onExport }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentUsers = users
    .filter(user => 
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="entries" className="text-sm text-gray-700">Show</label>
          <select
            id="entries"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={onAdd}
            className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-md shadow-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-1" /> Add
          </button>
          <button
            onClick={() => onExport(users)}
            className="flex items-center bg-green-500 text-white px-3 py-1 rounded-md shadow-md text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <FaDownload className="mr-1" /> Export
          </button>
        </div>
      </div>
      <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left align-middle">No.</th> 
            <th className="px-4 py-2 text-left align-middle">Name</th>
            <th className="px-4 py-2 text-left align-middle">Email</th>
            <th className="px-4 py-2 text-left align-middle">Phone Number</th>
            <th className="px-4 py-2 text-left align-middle">Car Brand</th>
            <th className="px-4 py-2 text-left align-middle">Role</th>
            <th className="px-4 py-2 text-left align-middle">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {currentUsers.map((user, index) => (
            <tr key={user._id} className="bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-2 align-middle">
                {startIndex + index + 1} 
              </td>
              <td className="px-4 py-2 align-middle">{user.name}</td>
              <td className="px-4 py-2 align-middle">{user.email}</td>
              <td className="px-4 py-2 align-middle">{user.phoneNumber}</td>
              <td className="px-4 py-2 align-middle">{user.carBrand}</td>
              <td className="px-4 py-2 align-middle">{user.role}</td>
              <td className="px-4 py-2 align-middle">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onView(user._id)}
                    className="text-gray-600 hover:text-gray-800 flex items-center"
                    aria-label="View"
                  >
                    <FaEye className="text-lg" />
                  </button>
                  <button
                    onClick={() => onEdit(user._id)}
                    className="text-gray-600 hover:text-gray-800 flex items-center"
                    aria-label="Edit"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() =>  onDelete(user._id)}
                    className="text-gray-600 hover:text-gray-800 flex items-center"
                    aria-label="Delete"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end items-center space-x-2 text-sm text-gray-700">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Previous"
        >
          Previous
        </button>
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md border text-gray-700 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white border-gray-300 hover:bg-gray-100'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;

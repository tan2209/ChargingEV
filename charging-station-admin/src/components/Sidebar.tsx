import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaChargingStation, FaTools, FaSignOutAlt } from 'react-icons/fa';

interface SidebarProps {
  onLogout: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li className="mb-2">
          <Link to="/" className="flex items-center py-2 px-4 rounded hover:bg-gray-600">
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/users" className="flex items-center py-2 px-4 rounded hover:bg-gray-600">
            <FaUsers className="mr-2" />
            Users
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/charging-stations" className="flex items-center py-2 px-4 rounded hover:bg-gray-600">
            <FaChargingStation className="mr-2" />
            Charging Stations
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/technical-support" className="flex items-center py-2 px-4 rounded hover:bg-gray-600">
            <FaTools className="mr-2" />
            Technical Support
          </Link>
        </li>
        <li className="mb-2">
          <button 
            onClick={onLogout} 
            className="flex items-center py-2 px-4 rounded hover:bg-gray-600 w-full text-left"
          >
            <FaSignOutAlt className="mr-2" />
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { FaUser, FaChargingStation, FaTools, FaDollarSign } from 'react-icons/fa';

interface DashboardStatsProps {
  totalAccounts: number;
  totalChargingStations: number;
  totalTech: number;
  totalRevenue: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ totalAccounts, totalChargingStations, totalTech, totalRevenue }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Accounts</h3>
          <p className="text-2xl font-semibold">{totalAccounts}</p>
        </div>
        <FaUser className="text-3xl" />
      </div>
      <div className="p-4 bg-green-500 text-white rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Charging Stations</h3>
          <p className="text-2xl font-semibold">{totalChargingStations}</p>
        </div>
        <FaChargingStation className="text-3xl" />
      </div>
      <div className="p-4 bg-yellow-500 text-white rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Technician</h3>
          <p className="text-2xl font-semibold">{totalTech}</p>
        </div>
        <FaTools className="text-3xl" />
      </div>
      <div className="p-4 bg-red-500 text-white rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Revenue</h3>
          <p className="text-2xl font-semibold">{totalRevenue}</p>
        </div>
        <FaDollarSign className="text-3xl" />
      </div>
    </div>
  );
};

export default DashboardStats;

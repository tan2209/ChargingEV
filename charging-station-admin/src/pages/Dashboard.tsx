import React, { useEffect, useState } from 'react';
import DashboardStats from '../components/DashboardStats';
import BarChart from '../components/BarChart';
import Header from '../components/Header';

const DashboardPage: React.FC = () => {
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalChargingStations, setTotalChargingStations] = useState(0);
  const [totalTech, setTotalTech] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState('');

  useEffect(() => {
    // Fetch or set data here
    setTotalAccounts(150); // Example data
    setTotalChargingStations(920); // Example data
    setTotalTech(10); // Example data
    setTotalRevenue('6.000.000'); // Example data
  }, []);

  const accountsData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Monthly revenue of VietEV 1',
        data: [40, 30, 20, 60, 70], 
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const chargingStationsData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Monthly revenue of VietEV 2',
        data: [30, 50, 40, 70, 36], 
        backgroundColor: '#10b981',
      },
    ],
  };

  const techData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Monthly revenue of VietEV 3',
        data: [20, 60, 30, 40, 55], 
        backgroundColor: '#f59e0b',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stack: true, 
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8 text-left">Dashboard</h1>
        <DashboardStats
          totalAccounts={totalAccounts}
          totalChargingStations={totalChargingStations}
          totalTech={totalTech}
          totalRevenue={totalRevenue}
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-24">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Revenue of VietEV 1</h2>
            <BarChart data={accountsData} options={options} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Revenue of VietEV 2</h2>
            <BarChart data={chargingStationsData} options={options} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Revenue of VietEV 3</h2>
            <BarChart data={techData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

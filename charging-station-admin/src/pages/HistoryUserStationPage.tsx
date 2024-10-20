import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHistoryChargingStationsByUser } from '../services/ChargingStationService';

const HistoryUserStationPage: React.FC = () => {
  const { stationName } = useParams<{ stationName: string }>();
  const [chargingHistory, setChargingHistory] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchChargingHistory = async () => {
      if (stationName) {
        const response = await getHistoryChargingStationsByUser(stationName);
        setChargingHistory(response);
      }
    };

    fetchChargingHistory();
  }, [stationName]);

 
 
  const totalPages = Math.ceil(chargingHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredHistory = chargingHistory.filter(history =>
    history.userDetails.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User History at {stationName}</h1>
      <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-4">
        <div className="mb-4 flex justify-between items-center">
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
          <input
            type="text"
            placeholder="Search by phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left align-middle">No.</th>
              <th className="px-4 py-2 text-left align-middle">Phone Number</th>
              <th className="px-4 py-2 text-left align-middle">Charge Date</th>
              <th className="px-4 py-2 text-left align-middle">Total Charge Time</th>
              <th className="px-4 py-2 text-left align-middle">Total Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {currentHistory.map((history, index) => (
              <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-2 align-middle">{startIndex + index + 1}</td>
                <td className="px-4 py-2 align-middle">{history.userDetails.phoneNumber}</td>
                <td className="px-4 py-2 align-middle">{new Date(history.chargeDate).toLocaleString('vi-VN', { timeZone: 'UTC', hour12: false })}</td>
                <td className="px-4 py-2 align-middle">{history.totalChargeTime} phút</td>
                <td className="px-4 py-2 align-middle">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(history.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end items-center space-x-2 text-sm text-gray-700">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Previous
          </button>
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-md border text-gray-700 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white border-gray-300 hover:bg-gray-100'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryUserStationPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHistoryCharging } from '../services/UserService';

const HistoryChargingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [chargingHistory, setChargingHistory] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchChargingHistory = async () => {
      if (id) {
        const response = await getHistoryCharging(id);
        setChargingHistory(response);
      }
    };

    fetchChargingHistory();
  }, [id]);

  const filteredHistory = chargingHistory.filter(history =>
    history.stationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationPages = () => {
    const pageRange = 3; // Số lượng trang xung quanh trang hiện tại
    let startPage = Math.max(1, currentPage - pageRange);
    let endPage = Math.min(totalPages, currentPage + pageRange);

    let pages: (number | string)[] = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    if (startPage > 1) {
      pages.unshift(1, '...');
    }
    if (endPage < totalPages) {
      pages.push('...', totalPages);
    }

    return pages;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Charging History</h1>
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
            placeholder="Search by station..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">No.</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Station</th>
              <th className="px-4 py-2 text-left">Amount Charged</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {currentHistory.map((history, index) => (
              <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-2">{startIndex + index + 1}</td>
                <td className="px-4 py-2">{new Date(history.chargeDate).toLocaleString('vi-VN', { timeZone: 'UTC', hour12: false })}</td>
                <td className="px-4 py-2">{history.stationName}</td>
                <td className="px-4 py-2">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(history.price)}
                </td>
                <td className="px-4 py-2">{history.totalChargeTime}</td>
                <td className="px-4 py-2">{history.paymentStatus}</td>
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
            &lt;
          </button>
          <div className="flex space-x-1">
            {getPaginationPages().map((page, index) =>
              page === '...' ? (
                <span key={index} className="px-3 py-1">...</span>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(Number(page))}
                  className={`px-3 py-1 rounded-md border text-gray-700 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white border-gray-300 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              )
            )}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Next"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryChargingPage;

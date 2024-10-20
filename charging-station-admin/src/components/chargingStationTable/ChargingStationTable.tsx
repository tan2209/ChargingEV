import React, { useState } from 'react';
import { ChargingStation } from '../../types/ChargingStation';
import { FaEdit, FaTrash, FaEye, FaPlus, FaDownload } from 'react-icons/fa';

interface ChargingStationTableProps {
  stations: ChargingStation[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (stationName: string) => void;
  onAdd: () => void;
  onExport: (data: any) => void;
}

const ChargingStationTable: React.FC<ChargingStationTableProps> = ({ 
  stations, 
  onEdit, 
  onDelete, 
  onView, 
  onAdd, 
  onExport 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredStations = stations?.filter(station =>
    station?.properties.stationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station?.properties.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStations = filteredStations.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationPages = () => {
    const pageRange = 3;
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
            onClick={() => onExport(stations)}
            className="flex items-center bg-green-500 text-white px-3 py-1 rounded-md shadow-md text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <FaDownload className="mr-1" /> Export
          </button>
        </div>
      </div>
      <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">No.</th>
            <th className="px-4 py-2 text-left">Business Status</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Charging Port</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Opening Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {currentStations.map((station, index) => (
            <tr key={station._id} className="bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-2">{startIndex + index + 1}</td> {/* Serial number */}
              <td className="px-4 py-2">{station.properties.bussinessStatus}</td>
              <td className="px-4 py-2">{station.properties.address}</td>
              <td className="px-4 py-2">{station.properties.stationName}</td>
              <td className="px-4 py-2">{station.properties.totalChargingPorts}</td>
              <td className="px-4 py-2">{JSON.stringify(station.geometry.coordinates)}</td>
              <td className="px-4 py-2">{station.properties.openingHours}</td>
              <td className="px-4 py-2">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => onView(station?.properties?.stationName)}
                    className="text-gray-600 hover:text-gray-800"
                    aria-label="View"
                  >
                    <FaEye className="text-lg" />
                  </button>
                  <button
                    onClick={() => onEdit(station._id)}
                    className="text-gray-600 hover:text-gray-800"
                    aria-label="Edit"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => onDelete(station._id)}
                    className="text-gray-600 hover:text-gray-800"
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
          &lt;
        </button>
        <div className="flex space-x-1">
          {getPaginationPages().map((page, index) =>
            page === '...' ? (
              <span key={index} className="px-3 py-1">...</span> // Render as span if ellipsis
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(Number(page))} // Ensure conversion to number
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
  );
};

export default ChargingStationTable;

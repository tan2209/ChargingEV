import React, { useState, useEffect } from 'react';
import { ChargingStation } from '../../types/ChargingStation';

interface ChargingStationFormProps {
  station: ChargingStation; 
  onSave: (updatedStation: ChargingStation) => void;
  onCancel: () => void;
}

const openingHoursOptions = [
  'Open',
  'Closed',
];

const EditChargingStationForm: React.FC<ChargingStationFormProps> = ({ station, onSave, onCancel }) => {
  const [formData, setFormData] = useState<ChargingStation>({
    ...station,
    properties: {
      ...station.properties,
      openingHours: station.properties.openingHours || openingHoursOptions[0], // Khởi tạo với tùy chọn mặc định
    },
  });

  // Cập nhật formData mỗi khi props station thay đổi
  useEffect(() => {
    setFormData({
      ...station,
      properties: {
        ...station.properties,
        openingHours: station.properties.openingHours || openingHoursOptions[0],
      },
    });
  }, [station]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "totalChargingPorts") {
      setFormData((prevData) => ({
        ...prevData,
        properties: {
          ...prevData.properties,
          totalChargingPorts: Number(value),
        },
      }));
    } else if (name === "lng" || name === "lat") {
      setFormData((prevData) => ({
        ...prevData,
        geometry: {
          ...prevData.geometry,
          [name]: parseFloat(value),
        },
      }));
    } else if (name === "openingHours") {
      setFormData((prevData) => ({
        ...prevData,
        properties: {
          ...prevData.properties,
          openingHours: value, 
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        properties: {
          ...prevData.properties,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Station Data:", formData);
    onSave(formData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Charging Station</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Trường tên trạm */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Station Name</label>
          <input
            type="text"
            name="stationName"
            value={formData.properties.stationName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Trường địa chỉ */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.properties.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Trường giờ mở cửa */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Opening Hours</label>
          <select
            name="openingHours"
            value={formData.properties.openingHours}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {openingHoursOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Trường tổng số cổng sạc */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Charging Ports</label>
          <input
            type="number"
            name="totalChargingPorts"
            value={formData.properties.totalChargingPorts}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Trường kinh độ */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            name="lng"
            value={formData.geometry.coordinates[0]}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Trường vĩ độ */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            name="lat"
            value={formData.geometry.coordinates[1]}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditChargingStationForm;

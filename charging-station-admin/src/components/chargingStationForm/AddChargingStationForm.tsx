import React, { useState } from 'react';

interface AddChargingStationFormProps {
    onSave: (newStation: NewStation) => void;
    onCancel: () => void;
}

interface NewStation {
    bussinessStatus: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'PERMANENTLY_CLOSED' | 'BUSINESS_STATUS_UNSPECIFIED' | 'CLOSED';
    location: { longitude: number; latitude: number };
    address: string;
    stationName: string;
    totalChargingPorts: number;
    openingHours: 'OPEN' | 'CLOSED';
}

const AddChargingStationForm: React.FC<AddChargingStationFormProps> = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState<NewStation>({
        bussinessStatus: 'OPERATIONAL',
        location: { longitude: 0, latitude: 0 },
        address: '',
        stationName: '',
        totalChargingPorts: 0,
        openingHours: 'OPEN',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'longitude' || name === 'latitude') {
            setFormData({
                ...formData,
                location: {
                    ...formData.location,
                    [name]: parseFloat(value),
                },
            });
        } else if (name === 'totalChargingPorts') {
            setFormData({ ...formData, [name]: parseInt(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Charging Station</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="bussinessStatus" className="block text-sm font-medium text-gray-700">Business Status</label>
                    <select
                        id="bussinessStatus"
                        name="bussinessStatus"
                        value={formData.bussinessStatus}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="OPERATIONAL">OPERATIONAL</option>
                        <option value="CLOSED_TEMPORARILY">CLOSED_TEMPORARILY</option>
                        <option value="PERMANENTLY_CLOSED">PERMANENTLY_CLOSED</option>
                        <option value="BUSINESS_STATUS_UNSPECIFIED">BUSINESS_STATUS_UNSPECIFIED</option>
                        <option value="CLOSED">CLOSED</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
                    <input
                        type="number"
                        id="longitude"
                        name="longitude"
                        value={formData.location.longitude}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
                    <input
                        type="number"
                        id="latitude"
                        name="latitude"
                        value={formData.location.latitude}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="stationName" className="block text-sm font-medium text-gray-700">Station Name</label>
                    <input
                        type="text"
                        id="stationName"
                        name="stationName"
                        value={formData.stationName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="totalChargingPorts" className="block text-sm font-medium text-gray-700">Total Charging Ports</label>
                    <input
                        type="number"
                        id="totalChargingPorts"
                        name="totalChargingPorts"
                        value={formData.totalChargingPorts}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700">Opening Hours</label>
                    <select
                        id="openingHours"
                        name="openingHours"
                        value={formData.openingHours}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="OPEN">Open</option>
                        <option value="CLOSED">Closed</option>
                    </select>
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

export default AddChargingStationForm;

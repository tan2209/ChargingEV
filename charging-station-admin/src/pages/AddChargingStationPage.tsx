import React from 'react';
import AddChargingStationForm from '../components/chargingStationForm/AddChargingStationForm';
import { useNavigate } from 'react-router-dom';
import { postNewStation } from '../services/ChargingStationService';

const AddChargingStationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = async (newStation: any) => {
    const phone = localStorage.getItem('phoneNumber');
    const station = {
        type: "Feature",
        geometry: {
          "type": "Point",
          "coordinates": [
            newStation.location.longitude,
            newStation.location.latitude
          ]
        },
        properties: {
          stationName: newStation.stationName,
          address: newStation.address,
          bussinessStatus: newStation.bussinessStatus,
          openingHours: newStation.openingHours,
          totalChargingPorts: newStation.totalChargingPorts,
        }
    }
    if (phone) {
      const res = await postNewStation (phone, station)
      navigate('/charging-stations'); 
    }
   
  };

  const handleCancel = () => {
    navigate('/charging-stations'); 
  };

  return (
    <div>
      <AddChargingStationForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default AddChargingStationPage;

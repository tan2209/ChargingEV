import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditChargingStationForm from '../components/chargingStationForm/EditChargingStationForm';
import { ChargingStation } from '../types/ChargingStation';
import { fetchChargingStations, getCharingStationById, updateChargingStation } from '../services/ChargingStationService';
import LoadingSpinner from '../components/Loading';

const EditChargingStationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [station, setStation] = useState<ChargingStation | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChargingStations = async () => {
      try {
        if (id) {
          const data = await getCharingStationById(id);
          setStation(data);
        }
      } catch (err) {
        console.error('Failed to fetch charging stations:', err);
      } finally {
        setLoading(false);
      }
    };

    getChargingStations();
  }, [id]);

  const handleSave = async (updatedStation: ChargingStation) => {
    if (id) {
      const res = await updateChargingStation(id, updatedStation)
      navigate('/charging-stations');
    }

  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="p-6">
      {loading ? (
        <LoadingSpinner />
      ) : station ? (
        <EditChargingStationForm station={station} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <p>Station not found.</p>
      )}
    </div>
  );
};

export default EditChargingStationPage;

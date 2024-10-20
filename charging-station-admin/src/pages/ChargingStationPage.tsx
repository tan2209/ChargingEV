import React, { useEffect, useState } from 'react';
import ChargingStationTable from '../components/chargingStationTable/ChargingStationTable';
import { ChargingStation } from '../types/ChargingStation';
import { deleteStation, fetchChargingStations } from '../services/ChargingStationService';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/Loading';
import Papa from 'papaparse';
import Alert from '../components/Notification';

const ChargingStationManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [chargingStations, setChargingStations] = useState<ChargingStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const getChargingStations = async () => {
      try {
        const phoneNumber = localStorage.getItem('phoneNumber');
        const data = await fetchChargingStations(phoneNumber);
        setChargingStations(data);
      } catch (err) {
        console.error('Failed to fetch charging stations:', err);
      } finally {
        setLoading(false);
      }
    };

    getChargingStations();
  }, []);
  const handleExport = (data : any) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    a.style.visibility = 'hidden';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  if (loading) {
    return <LoadingSpinner />;
  }

  const handleEdit = (id: string) => {
    navigate(`/edit-station/${id}`); 
  };
  
 
    const handleView = (station: string) => {
      navigate(`/charging-station-history/${station}`);
    };
  
  
    const showAlertMessage = (message: string) => {
      setAlertMessage(message);
      setShowAlert(true);
  
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    };
  const handleAdd = () => {
    navigate(`/add-station`);
  };
  
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa không?'); 

    if (confirmDelete) {
      try {
        await deleteStation(id);
       setChargingStations((prev) => prev.filter(s => s._id !== id));
        showAlertMessage('dele!'); 
      } catch (error) {
        showAlertMessage('Xóa người dùng thất bại!'); 
      }
    }
   
  };

  return (
    <div>
       {showAlert && <Alert message={alertMessage} />}
      <ChargingStationTable 
        onExport={handleExport} 
        onAdd={handleAdd}
        stations={chargingStations} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onView={handleView}
      />
      {/* Uncomment and implement if you have a form for editing or adding stations */}
      {/* <ChargingStationForm 
        existingStation={editingStation} 
        onSave={handleSave} 
      /> */}
    </div>
  );
};

export default ChargingStationManagementPage;

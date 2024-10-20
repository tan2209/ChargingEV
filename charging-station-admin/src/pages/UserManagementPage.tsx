import React, { useEffect, useState } from 'react';
import UserTable from '../components/userTable.tsx/UserTable';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUserByManager } from '../services/UserService';
import Alert from '../components/Notification'; 
import LoadingSpinner from '../components/Loading';
import Papa from 'papaparse';

const UserManagementPage: React.FC = () => {
  const [user, setUsers] = useState<User[]>([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true); 
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); 
    try {
      const phoneNumber = localStorage.getItem('phoneNumber');
      const fetchedUsers = await getUserByManager(phoneNumber, 'user');
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      showAlertMessage('Không thể tải người dùng!');
    } finally {
      setLoading(false); 
    }
  };
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
  const handleOnView = async (userId: string) => {
    navigate(`/history-charging/${userId}`);
  };

  const handleDeleteUser = async (id: string) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa không?'); 

    if (confirmDelete) {
      try {
        await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        showAlertMessage('Xóa người dùng thành công!'); 
      } catch (error) {
        showAlertMessage('Xóa người dùng thất bại!'); 
      }
    }
  };

  const handleEditUser = (id: string) => {
    navigate(`/edit-user/${id}`);
  };

  const handleAdd = () => {
    navigate(`/add-user`); 
  };

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div>
      {showAlert && <Alert message={alertMessage} />}
      {loading ? ( 
        <LoadingSpinner /> 
      ) : (
        <UserTable 
          users={user} 
          onEdit={handleEditUser} 
          onDelete={handleDeleteUser} 
          onAdd={handleAdd} 
          onExport={handleExport} 
          onView={handleOnView}
        />
      )}
    </div>
  );
};

export default UserManagementPage;

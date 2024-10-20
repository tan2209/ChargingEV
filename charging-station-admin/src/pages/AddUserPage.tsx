import React, { useState } from 'react';
import AddUserForm from '../components/userForm/AddUserForm';
import { useNavigate } from 'react-router-dom';
import { postNewUser } from '../services/UserService';
import Alert from '../components/Notification'; // Nhập component Alert

const AddUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = async (newUser: any) => {
    try {
      const res = await postNewUser(newUser);
      if (res.status === 201) { // Sửa phép so sánh từ '=' thành '==='
        showAlertMessage('Thêm người dùng thành công!'); // Hiện thông báo thành công
      }
      navigate('/users'); 
    } catch (error) {
      showAlertMessage('Thêm người dùng thất bại!'); // Hiện thông báo lỗi nếu có
    }
  };

  const handleCancel = () => {
    navigate('/users'); 
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
      <AddUserForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default AddUserPage;

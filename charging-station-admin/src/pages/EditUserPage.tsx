import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditUserForm from '../components/userForm/UserForm'; 
import { User } from '../types/User'; 
import { getUserById, updateUserById } from '../services/UserService';

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (id) {
             const data = await getUserById(id); 
            setUser(data);
        }
       
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [id]);

  const handleSave = async (id: string,updatedUser: any) => {
    await updateUserById(id, updatedUser)
    navigate('/'); 
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <EditUserForm user={user} handleSave={handleSave} onCancel={handleCancel} />
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default EditUserPage;

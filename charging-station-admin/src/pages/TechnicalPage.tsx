import React, { useEffect, useState } from 'react';
import UserTable from '../components/userTable.tsx/UserTable';
import UserForm from '../components/userForm/UserForm';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';
import { getUserByManager } from '../services/UserService';

const TechnicalPage: React.FC = () => {
  const [user, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const phoneNumber = localStorage.getItem('phoneNumber');
    const fetchedUsers = await getUserByManager(phoneNumber, 'technical');
    setUsers(fetchedUsers);
  };

  const handleSaveUser = async (user: User) => {
   
  };

  const handleDeleteUser = async (id: string) => {
   
  };

  const handleEditUser = (id: string) => {
    navigate(`/edit-user/${id}`);
  };

  const handleAdd = () => {
  
    navigate(`/add-user`);
  };
  return (
    <div>
      <UserTable users={user} onEdit={handleEditUser} onDelete={handleDeleteUser} onAdd={handleAdd} onExport={handleAdd} onView={handleAdd}/>
    </div>
  );
};

export default TechnicalPage;

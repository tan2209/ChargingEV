import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserRoleContextType {
  role: string | null;
  updateRole: (newRole: string) => Promise<void>;
}

// Khai báo giá trị mặc định là null với kiểu `UserRoleContextType | null`
const UserRoleContext = createContext<UserRoleContextType | null>(null);

export const UserRoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const storedRole = await AsyncStorage.getItem('userRole');
      setRole(storedRole);
    };

    fetchUserRole();
  }, []);

  const updateRole = async (newRole: string) => {
    setRole(newRole);
    await AsyncStorage.setItem('userRole', newRole);
  };

  return (
    <UserRoleContext.Provider value={{ role, updateRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = React.useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

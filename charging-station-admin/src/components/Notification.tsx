// src/components/Alert.js
import React, { useEffect } from 'react';

const Alert = ({ message} : any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
    }, 3000);

    return () => clearTimeout(timer); 
  }, [3000]);

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg">
      <p>{message}</p>
    </div>
  );
};

export default Alert;

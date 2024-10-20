// LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 relative">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-600 border-t-4 border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

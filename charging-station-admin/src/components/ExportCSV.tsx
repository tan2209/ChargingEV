import React from 'react';
import Papa from 'papaparse';

const ExportCSVButton = ({ data }: any) => {
  const handleExport = () => {
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

  return (
    <button onClick={handleExport} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      Export to CSV
    </button>
  );
};

export default ExportCSVButton;

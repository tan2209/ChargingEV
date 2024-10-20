// Header.tsx
import React from 'react';
import { BsSearch, BsFillBellFill } from 'react-icons/bs';

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <header className="flex items-center justify-between bg-white p-2 shadow-sm">
      {/* Tên trang nằm bên trái */}
      <div className="text-lg font-semibold">{pageTitle}</div>
      
      {/* Các thành phần bên phải */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-300">
          <BsSearch className="text-gray-600 text-sm" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 p-1 border-none outline-none bg-transparent text-sm"
          />
        </div>
        <BsFillBellFill className="text-gray-600 cursor-pointer" />
        <img
          src="https://via.placeholder.com/30"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/UserService';
import Alert from '../components/Notification';

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginUser = { phoneNumber, password }
    const res = await login(loginUser)
    setShowAlert(true);
    if (res.data) {
      setAlertMessage('Login successful!')
      localStorage.setItem('phoneNumber', phoneNumber);
      onLogin();
      navigate('/')
    } else {
      setAlertMessage('Login fail!')
    }
  };

  setTimeout(() => {
    setShowAlert(false);
  }, 3000);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-700">Register</a>
        </p>
      </div>
      {showAlert && <Alert message={alertMessage} />}
    </div>
  );
};

export default LoginPage;

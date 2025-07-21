// components/LogoutButton.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../utils/authUtils';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    const success = await logoutUser();
    if (success) {
      navigate('/login');
    } else {
      alert('Failed to log out. Please try again.');
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-red-600 hover:text-red-800 text-sm font-medium focus:outline-none"
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
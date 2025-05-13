// src/pages/SplashScreen.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // Redirect after 2.5 seconds
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white text-center px-4">
      <h1 className="text-xl font-bold text-orange-500 mb-4">Staff Portal</h1>
      <img
        src="/icon.png"
        alt="Woodland Ways Logo"
        className="w-40 h-40 object-contain mb-4"
      />
      <p className="text-sm text-gray-700 italic">
        The authoritative voice of bushcraft
      </p>
    </div>
  );
};

export default SplashScreen;

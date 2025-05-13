import React from 'react';

const SplashScreen = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white">

      {/* App Name */}
      <h1 className="text-lg text-gray-400 mb-2">Staff Portal</h1>

      {/* Logo */}
      <img
        src="/icon.png"
        alt="Woodland Ways Logo"
        className="w-40 h-auto mb-4"
      />

      {/* Tagline */}
      <p className="text-sm text-gray-500 font-medium">
        Wilderness Bushcraft Expeditions Tracking Survival Skills
      </p>
    </div>
  );
};

export default SplashScreen;

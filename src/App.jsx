import React from 'react';
import { Assignment, CalendarMonth, MenuBook, Menu, Home } from '@mui/icons-material';

const App = () => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
        <img src="/icon.png" alt="Logo" className="h-8" />
        <h1 className="text-xl font-bold text-orange-600">Woodland Ways</h1>
      </header>

      {/* Post Input Bar */}
      <div className="px-4 py-3 border-b border-gray-300">
        <input
          type="text"
          placeholder="Post an update..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-sm focus:outline-none"
        />
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-gray-700 font-semibold">Joe</div>
          <div className="text-sm text-gray-500 mb-2">2 hours ago</div>
          <div className="text-gray-800">Course went great today! Loads of happy faces.</div>
        </div>

        {/* Add more posts here if needed */}
      </div>

      {/* Bottom Navigation */}
      <footer className="border-t border-gray-300">
        <nav className="flex justify-around items-center text-xs text-gray-700 py-2">
          <div className="flex flex-col items-center">
            <Home fontSize="medium" className="text-orange-600" />
            <span className="text-[11px]">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <Assignment fontSize="medium" />
            <span className="text-[11px]">My Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <CalendarMonth fontSize="medium" />
            <span className="text-[11px]">Calendar</span>
          </div>
          <div className="flex flex-col items-center">
            <MenuBook fontSize="medium" />
            <span className="text-[11px]">Handbook</span>
          </div>
          <div className="flex flex-col items-center">
            <Menu fontSize="medium" />
            <span className="text-[11px]">Menu</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default App;

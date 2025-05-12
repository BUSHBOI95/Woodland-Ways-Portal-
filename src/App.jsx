import React from 'react';
import { Assignment, CalendarMonth, MenuBook, Menu, Home } from '@mui/icons-material';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-gray-300">
        <img
          src="/icon.png"
          alt="Logo"
          className="w-8 h-8 mr-2"
        />
        <h1 className="text-xl font-bold text-orange-600">Woodland Ways</h1>
      </header>

      {/* Post bar */}
      <div className="px-4 py-3 border-b border-gray-300">
        <input
          type="text"
          placeholder="Post an update..."
          className="w-full px-4 py-2 border rounded-full bg-gray-100 text-sm"
        />
      </div>

      {/* Feed */}
      <div className="flex-1 px-4 py-2 overflow-y-auto">
        <div className="text-gray-800 text-sm mb-2">"Course went great today! Loads of happy faces."</div>
        <div className="text-gray-500 text-xs">– Joe, 2 hours ago</div>
      </div>

      {/* Bottom Navigation */}
      <footer className="border-t border-gray-300">
        <nav className="flex justify-around items-center text-xs text-gray-700 py-2">
          <div className="flex flex-col items-center text-orange-600">
            <Home fontSize="small" />
            <span className="text-[11px]">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <Assignment fontSize="small" />
            <span className="text-[11px]">My Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <CalendarMonth fontSize="small" />
            <span className="text-[11px]">Calendar</span>
          </div>
          <div className="flex flex-col items-center">
            <MenuBook fontSize="small" />
            <span className="text-[11px]">Handbook</span>
          </div>
          <div className="flex flex-col items-center">
            <Menu fontSize="small" />
            <span className="text-[11px]">Menu</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default App;

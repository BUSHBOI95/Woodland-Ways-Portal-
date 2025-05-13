 import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';

const Handbook = () => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">Staff Handbook</h1>
        <div className="text-2xl">📖</div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <p className="text-gray-700 text-sm">
          Below you’ll find downloadable policies, safety protocols, and reference material for all staff. Tap any item to open or download.
        </p>

        {/* Example handbook items */}
        <div className="space-y-3">
          <div className="bg-gray-100 p-3 rounded-lg shadow-sm text-sm hover:bg-orange-50 transition">Code of Conduct</div>
          <div className="bg-gray-100 p-3 rounded-lg shadow-sm text-sm hover:bg-orange-50 transition">Risk Assessment Template</div>
          <div className="bg-gray-100 p-3 rounded-lg shadow-sm text-sm hover:bg-orange-50 transition">Child Safeguarding Policy</div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <NavLink to="/" className="flex flex-col items-center">
            <Home fontSize="medium" />
            <span className="text-[11px]">Home</span>
          </NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center">
            <Assignment fontSize="medium" />
            <span className="text-[11px]">My Courses</span>
          </NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center">
            <CalendarMonth fontSize="medium" />
            <span className="text-[11px]">Calendar</span>
          </NavLink>
          <NavLink to="/handbook" className="flex flex-col items-center text-orange-500">
            <MenuBook fontSize="medium" />
            <span className="text-[11px]">Handbook</span>
          </NavLink>
          <NavLink to="/menu" className="flex flex-col items-center">
            <Menu fontSize="medium" />
            <span className="text-[11px]">Menu</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Handbook;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';

const MenuPage = () => {
  const items = [
    { label: 'Resources', path: '/photos' },
    { label: 'Events', path: '/events' },
    { label: 'Instructor Directory', path: '/directory' },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">Menu</h1>
        <div className="text-2xl">☰</div>
      </header>

      {/* Menu Buttons */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="block bg-orange-400 text-white text-center rounded-full py-3 text-sm font-semibold hover:bg-orange-500 transition"
          >
            {item.label}
          </NavLink>
        ))}
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
          <NavLink to="/handbook" className="flex flex-col items-center">
            <MenuBook fontSize="medium" />
            <span className="text-[11px]">Handbook</span>
          </NavLink>
          <NavLink to="/menu" className="flex flex-col items-center text-orange-500">
            <Menu fontSize="medium" />
            <span className="text-[11px]">Menu</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default MenuPage;

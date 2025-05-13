import React from 'react';
import { Assignment, CalendarMonth, MenuBook, Menu, Home, Settings, Logout, Info, HelpOutline } from '@mui/icons-material';

const MenuPage = () => {
  const menuItems = [
    {
      icon: <Settings fontSize="small" />,
      label: "App Settings",
      action: () => alert("Navigate to Settings")
    },
    {
      icon: <HelpOutline fontSize="small" />,
      label: "Support",
      action: () => alert("Open support options")
    },
    {
      icon: <Info fontSize="small" />,
      label: "About Woodland Ways",
      action: () => alert("Show about modal")
    },
    {
      icon: <Logout fontSize="small" className="text-red-500" />,
      label: "Log Out",
      action: () => alert("Logging out...")
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">Menu</h1>
        <div className="text-2xl">☰</div>
      </header>

      {/* Menu Options */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="flex items-center justify-between w-full bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition text-sm"
          >
            <div className="flex items-center gap-2 text-gray-700">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <div className="flex flex-col items-center">
            <Home fontSize="medium" />
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
            <Menu fontSize="medium" className="text-orange-500" />
            <span className="text-[11px]">Menu</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default MenuPage;

import React from 'react';
import { Assignment, CalendarMonth, MenuBook, Menu, Home } from '@mui/icons-material';

const Calendar = () => {
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();

  const days = Array.from({ length: 31 }, (_, i) => i + 1); // Mock 31 days

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">Calendar</h1>
        <div className="text-2xl">📅</div>
      </header>

      {/* Month View */}
      <div className="p-4">
        <h2 className="text-center text-gray-800 font-semibold mb-2">
          {currentMonth} {currentYear}
        </h2>
        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-600">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="font-semibold">{d}</div>
          ))}
          {days.map((day) => (
            <div
              key={day}
              className="p-2 rounded-md hover:bg-orange-100 transition cursor-pointer"
            >
              {day}
            </div>
          ))}
        </div>
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
            <CalendarMonth fontSize="medium" className="text-orange-500" />
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

export default Calendar;

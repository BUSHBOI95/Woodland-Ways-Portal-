import React from 'react';
import { Home, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">

      {/* Header */}
      <header className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">Staff Portal</h1>
      </header>

      {/* Logo - enlarged */}
      <div className="mt-6 flex justify-center">
        <img src="/Icon.png" alt="Woodland Ways Logo" className="w-80 max-w-[90%] h-auto mb-6" />
      </div>

      {/* Post Input */}
      <div className="px-4">
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
      </div>

      {/* Buttons - with routing */}
      <div className="flex justify-around gap-3 px-4 mt-4">
        <button onClick={() => navigate('/photos')} className="bg-orange-400 text-white px-4 py-3 rounded-full text-sm font-semibold tracking-wide flex-1">Photos</button>
        <button onClick={() => navigate('/events')} className="bg-orange-400 text-white px-4 py-3 rounded-full text-sm font-semibold tracking-wide flex-1">Events</button>
        <button onClick={() => navigate('/directory')} className="bg-orange-400 text-white px-4 py-3 rounded-full text-sm font-semibold tracking-wide flex-1">Directory</button>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <img src="/Icon.png" alt="Avatar" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold text-sm">Jon Magellan</p>
              <p className="text-xs text-gray-500">26m ago</p>
            </div>
          </div>
          <p className="text-sm text-gray-800">All sorted, I've knocked these up for the show to use.</p>
        </div>
      </div>

      {/* Bottom Navigation - routed */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <div className="flex flex-col items-center" onClick={() => navigate('/')}>
            <Home fontSize="medium" className="text-orange-500" />
            <span className="text-[11px]">Home</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => navigate('/my-courses')}>
            <Assignment fontSize="medium" />
            <span className="text-[11px]">My Courses</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => navigate('/calendar')}>
            <CalendarMonth fontSize="medium" />
            <span className="text-[11px]">Calendar</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => navigate('/handbook')}>
            <MenuBook fontSize="medium" />
            <span className="text-[11px]">Handbook</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => navigate('/menu')}>
            <Menu fontSize="medium" />
            <span className="text-[11px]">Menu</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;

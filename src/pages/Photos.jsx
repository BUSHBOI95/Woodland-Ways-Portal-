import React from 'react';
import { Assignment, CalendarMonth, MenuBook, Menu, Home, PhotoCamera } from '@mui/icons-material';

const Photos = () => {
  const photoList = [
    "/photos/course1.jpg",
    "/photos/course2.jpg",
    "/photos/team1.jpg",
    "/photos/firecraft.jpg"
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">Photos</h1>
        <PhotoCamera fontSize="medium" />
      </header>

      {/* Photo Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {photoList.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`WWays Photo ${i + 1}`}
              className="w-full h-32 object-cover rounded-lg shadow-sm"
            />
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

export default Photos;

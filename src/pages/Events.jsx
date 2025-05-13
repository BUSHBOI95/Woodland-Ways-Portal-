import React from 'react';
import { Assignment, CalendarMonth, MenuBook, Menu, Home, Event } from '@mui/icons-material';

const Events = () => {
  const events = [
    {
      title: "Instructor CPD Day",
      date: "Friday 7th June",
      time: "09:30–16:00",
      location: "WW HQ, Derbyshire",
      description: "A full day of hands-on skills refreshers, firelighting challenges, and scenario-based training."
    },
    {
      title: "Team Social: River BBQ",
      date: "Saturday 15th June",
      time: "18:00–Late",
      location: "Monsal Dale",
      description: "Informal social event – bring instruments, food, and swimming kit. Family welcome."
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">Events</h1>
        <Event fontSize="medium" />
      </header>

      {/* Event List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {events.map((event, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold text-gray-800 text-sm">{event.title}</h2>
            <p className="text-xs text-gray-600">{event.date} – {event.time}</p>
            <p className="text-xs text-gray-600 mb-2">{event.location}</p>
            <p className="text-sm text-gray-700">{event.description}</p>
          </div>
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
            <Menu fontSize="medium" />
            <span className="text-[11px]">Menu</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Events;

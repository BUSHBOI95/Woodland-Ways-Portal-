import React from 'react';
import { Assignment, CalendarMonth, MenuBook, Menu, Home } from '@mui/icons-material';

const MyCourses = () => {
  const courses = [
    {
      title: "2-Day Foraging Course – Peak District",
      date: "Sat 25th – Sun 26th May",
      location: "Bamford Woodlands",
      status: "Report Pending",
      risk: "Moderate",
      weather: "14°C, Cloudy"
    },
    {
      title: "Fire & Flint Workshop – Yorkshire",
      date: "Mon 3rd June",
      location: "Wharncliffe Crags",
      status: "Report Submitted",
      risk: "Low",
      weather: "18°C, Sunny"
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">My Courses</h1>
        <div className="text-2xl">🗂️</div>
      </header>

      {/* Course List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold text-gray-800 text-sm mb-1">{course.title}</h2>
            <p className="text-xs text-gray-600 mb-1">{course.date} – {course.location}</p>
            <div className="text-xs text-gray-700 mb-1">Weather: {course.weather}</div>
            <div className="text-xs text-gray-700 mb-1">Risk Rating: {course.risk}</div>
            <div className="flex gap-2 mt-2">
              <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                {course.status === "Report Pending" ? "Submit Report" : "View Report"}
              </button>
              <button
                className={`text-xs px-3 py-1 rounded-full ${
                  course.status === "Report Submitted"
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-orange-400 text-white"
                }`}
              >
                Generate Invoice
              </button>
            </div>
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
            <Assignment fontSize="medium" className="text-orange-500" />
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

export default MyCourses;

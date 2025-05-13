import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';

const MyCourses = () => {
  const navigate = useNavigate();

  // Simulated instructor and submission tracking
  const instructorInitials = 'JP';
  const [submittedReports, setSubmittedReports] = useState(['2-Day Foraging Course – Peak District']);
  const [submittedInvoices, setSubmittedInvoices] = useState(['2-Day Foraging Course – Peak District']);

  const courses = [
    {
      id: 1,
      title: "2-Day Foraging Course – Peak District",
      date: "Sat 25th – Sun 26th May",
      location: "Bamford Woodlands",
      duration: "2-day",
      risk: "Moderate",
      weather: "14°C, Cloudy"
    },
    {
      id: 2,
      title: "Fire & Flint Workshop – Yorkshire",
      date: "Mon 3rd June",
      location: "Wharncliffe Crags",
      duration: "1-day",
      risk: "Low",
      weather: "18°C, Sunny"
    }
  ];

  const handleDownloadInvoice = (course) => {
    // Trigger route to invoice page in read-only mode
    navigate('/generate-invoice', { state: { course, readonly: true } });
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">My Courses</h1>
        <div className="text-2xl">🗂️</div>
      </header>

      {/* My Reports Button */}
      <div className="px-4 py-3">
        <NavLink to="/report-archive">
          <button className="bg-orange-400 text-white px-4 py-2 rounded-full w-full font-medium text-sm">
            My Reports
          </button>
        </NavLink>
      </div>

      {/* Course List */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-4">
        {courses.map((course) => {
          const reportSubmitted = submittedReports.includes(course.title);
          const invoiceSubmitted = submittedInvoices.includes(course.title);

          return (
            <div key={course.id} className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h2 className="font-semibold text-gray-800 text-sm mb-1">{course.title}</h2>
              <p className="text-xs text-gray-600 mb-1">{course.date} – {course.location}</p>
              <p className="text-xs text-gray-700 mb-1">Weather: {course.weather}</p>
              <p className="text-xs text-gray-700 mb-1">Risk Rating: {course.risk}</p>

              <div className="flex flex-col gap-2 mt-2">
                <button
                  className="bg-orange-500 text-white text-xs px-3 py-2 rounded-full"
                  onClick={() => navigate('/submit-report', { state: { course } })}
                >
                  {reportSubmitted ? "View/Edit Report" : "Submit Report"}
                </button>

                {!invoiceSubmitted ? (
                  <button
                    className="bg-orange-400 text-white text-xs px-3 py-2 rounded-full"
                    onClick={() => navigate('/generate-invoice', { state: { course } })}
                  >
                    Generate Invoice
                  </button>
                ) : (
                  <button
                    className="bg-green-600 text-white text-xs px-3 py-2 rounded-full"
                    onClick={() => handleDownloadInvoice(course)}
                  >
                    Download Invoice
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <NavLink to="/" className="flex flex-col items-center">
            <Home fontSize="medium" />
            <span className="text-[11px]">Home</span>
          </NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center text-orange-500">
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
          <NavLink to="/menu" className="flex flex-col items-center">
            <Menu fontSize="medium" />
            <span className="text-[11px]">Menu</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default MyCourses;

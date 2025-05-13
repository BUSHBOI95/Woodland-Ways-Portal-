import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';

const MyCourses = () => {
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const allCourses = [
    {
      id: 1,
      title: "2-Day Foraging Course",
      startDate: "2025-05-12",
      endDate: "2025-05-13",
      location: "Peak District",
      duration: "2-day",
      risk: "Moderate",
      weather: "14°C, Cloudy"
    },
    {
      id: 2,
      title: "Fire & Flint Workshop",
      startDate: "2025-06-03",
      endDate: "2025-06-03",
      location: "Wharncliffe Crags",
      duration: "1-day",
      risk: "Low",
      weather: "18°C, Sunny"
    }
  ];

  const [submittedReports, setSubmittedReports] = useState([]);
  const [submittedInvoices, setSubmittedInvoices] = useState([]);
  const [remindedCourses, setRemindedCourses] = useState([]);

  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem('submittedReports') || '{}');
    const invoices = JSON.parse(localStorage.getItem('invoiceArchive') || '[]');

    const reportTitles = Object.keys(reports);
    const invoiceTitles = invoices.map(entry => entry.courseTitle);

    setSubmittedReports(reportTitles);
    setSubmittedInvoices(invoiceTitles);
  }, []);

  useEffect(() => {
    const pastCourses = allCourses.filter(c => c.endDate < today);
    pastCourses.forEach((course) => {
      const alreadyReminded = remindedCourses.includes(course.title);
      const missingReport = !submittedReports.includes(course.title);
      const missingInvoice = !submittedInvoices.includes(course.title);

      if (!alreadyReminded && (missingReport || missingInvoice)) {
        alert(`Reminder: Submit report and invoice for "${course.title}"`);
        setRemindedCourses(prev => [...prev, course.title]);
      }
    });
  }, [submittedReports, submittedInvoices]);

  const upcomingCourses = allCourses.filter(c => c.endDate >= today);
  const pastCourses = allCourses.filter(c => c.endDate < today);

  const renderCourseCard = (course, isPast = false) => {
    const reportSubmitted = submittedReports.includes(course.title);
    const invoiceSubmitted = submittedInvoices.includes(course.title);

    return (
      <div
        key={course.id}
        className={`bg-gray-100 p-4 rounded-xl shadow-sm ${isPast ? 'cursor-pointer hover:bg-gray-200' : ''}`}
        onClick={() => {
          if (isPast) {
            navigate('/course-details', { state: { course } });
          }
        }}
      >
        <h2 className="font-semibold text-gray-800 text-sm mb-1">{course.title}</h2>
        <p className="text-xs text-gray-600 mb-1">{course.startDate} – {course.location}</p>
        <p className="text-xs text-gray-700 mb-1">Weather: {course.weather}</p>
        <p className="text-xs text-gray-700 mb-1">Risk Rating: {course.risk}</p>

        {!isPast && (
          <div className="flex flex-col gap-2 mt-2">
            <button
              className="bg-orange-500 text-white text-xs px-3 py-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/submit-report', { state: { course } });
              }}
            >
              {reportSubmitted ? "View/Edit Report" : "Submit Report"}
            </button>

            {!invoiceSubmitted ? (
              <button
                className="bg-orange-400 text-white text-xs px-3 py-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/generate-invoice', { state: { course } });
                }}
              >
                Generate Invoice
              </button>
            ) : (
              <button
                className="bg-green-600 text-white text-xs px-3 py-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/generate-invoice', { state: { course, readonly: true } });
                }}
              >
                Download Invoice
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">My Courses</h1>
        <div className="text-2xl">🗂️</div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-6">
        {/* Upcoming */}
        <div>
          <h2 className="text-base font-semibold text-gray-700 my-3">Upcoming Courses</h2>
          <div className="space-y-4">
            {upcomingCourses.map(c => renderCourseCard(c))}
          </div>
        </div>

        {/* Past */}
        <div>
          <h2 className="text-base font-semibold text-gray-700 mt-6 mb-3">Past Courses</h2>
          <div className="space-y-4">
            {pastCourses.map(c => renderCourseCard(c, true))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
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

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CourseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const reportSubmitted = true; // placeholder until integrated with report store
  const invoiceSubmitted = true; // placeholder until integrated with invoice archive

  if (!course) {
    return <div className="p-4 text-center text-sm text-red-500">Course not found.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">{course.title}</h1>
        <div className="text-2xl">📋</div>
      </header>

      <div className="p-4 space-y-3 text-sm text-gray-800 flex-1">
        <p><strong>Date:</strong> {course.startDate} – {course.endDate}</p>
        <p><strong>Location:</strong> {course.location}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Weather:</strong> {course.weather}</p>
        <p><strong>Risk Rating:</strong> {course.risk}</p>

        <hr className="my-2" />

        {reportSubmitted && (
          <button
            className="w-full bg-orange-500 text-white py-2 rounded-full font-medium"
            onClick={() => navigate('/submit-report', { state: { course } })}
          >
            View/Edit Report
          </button>
        )}

        {invoiceSubmitted && (
          <button
            className="w-full bg-green-600 text-white py-2 rounded-full font-medium"
            onClick={() => navigate('/generate-invoice', { state: { course, readonly: true } })}
          >
            Download Invoice
          </button>
        )}
      </div>

      <footer className="text-center text-xs text-gray-500 pb-4">Woodland Ways Staff Portal</footer>
    </div>
  );
};

export default CourseDetails;

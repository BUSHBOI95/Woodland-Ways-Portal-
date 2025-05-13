import React, { useEffect, useState } from 'react';
import { getReports } from '../data/reportStore';

const AdminDashboard = () => {
  const [submittedReports, setSubmittedReports] = useState([]);

  useEffect(() => {
    setSubmittedReports(getReports());
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      {submittedReports.length === 0 ? (
        <p className="text-sm text-gray-500">No reports submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {submittedReports.map((entry, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-sm mb-1">{entry.course.title}</h2>
              <p className="text-xs text-gray-600">Submitted: {new Date(entry.submittedAt).toLocaleString()}</p>
              <p className="text-sm mt-2"><strong>Attendance:</strong> {entry.report.attendance}</p>
              <p className="text-sm"><strong>Kit Used:</strong> {entry.report.kitUsed}</p>
              <p className="text-sm mb-2"><strong>Notes:</strong> {entry.report.notes}</p>

              <button
                onClick={() => window.print()} // Temp export
                className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full"
              >
                Export / Print
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

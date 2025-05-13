import React, { useState, useEffect } from 'react';
import { getReports, getReportsByYear, getReportsByType } from '../data/reportStore';

const ReportArchive = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (filterType === 'year' && filter) {
      setReports(getReportsByYear(filter));
    } else if (filterType === 'type' && filter) {
      setReports(getReportsByType(filter));
    } else {
      setReports(getReports());
    }
  }, [filter, filterType]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Report Archive</h1>

      {/* Filter Options */}
      <div className="flex gap-2 mb-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="all">All</option>
          <option value="year">Year</option>
          <option value="type">Course Type</option>
        </select>
        <input
          type="text"
          placeholder={filterType === 'year' ? 'e.g. 2024' : 'e.g. fire'}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 border px-2 py-1 rounded text-sm"
        />
      </div>

      {/* Report List */}
      {reports.length === 0 ? (
        <p className="text-sm text-gray-500">No reports found.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((r, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded shadow-sm">
              <h2 className="font-semibold text-sm mb-1">{r.course.title}</h2>
              <p className="text-xs text-gray-500">
                {new Date(r.submittedAt).toLocaleDateString()}
              </p>
              <p className="text-xs mt-2">
                <strong>Attendance:</strong> {r.report.attendance}
              </p>
              <p className="text-xs">
                <strong>Kit:</strong> {r.report.kitUsed}
              </p>
              <p className="text-xs">
                <strong>Notes:</strong> {r.report.notes}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportArchive;

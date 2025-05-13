import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SubmitReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [report, setReport] = useState({
    attendance: '',
    notes: '',
    kitUsed: '',
    file: null
  });

  const handleSubmit = () => {
    // Mock submission logic (later connect to backend)
    alert('Report submitted!');
    navigate('/my-courses', { state: { reportSubmittedFor: course.title } });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-lg font-bold mb-4">Submit Report</h1>
      <p className="text-sm text-gray-600 mb-2">{course?.title}</p>

      <textarea
        placeholder="Attendance notes"
        className="w-full border p-2 rounded mb-3 text-sm"
        value={report.attendance}
        onChange={(e) => setReport({ ...report, attendance: e.target.value })}
      />

      <textarea
        placeholder="Kit used"
        className="w-full border p-2 rounded mb-3 text-sm"
        value={report.kitUsed}
        onChange={(e) => setReport({ ...report, kitUsed: e.target.value })}
      />

      <textarea
        placeholder="Additional notes"
        className="w-full border p-2 rounded mb-3 text-sm"
        value={report.notes}
        onChange={(e) => setReport({ ...report, notes: e.target.value })}
      />

      <input
        type="file"
        onChange={(e) => setReport({ ...report, file: e.target.files[0] })}
        className="mb-4"
      />

      <button
        onClick={handleSubmit}
        className="bg-orange-500 text-white w-full py-2 rounded font-semibold"
      >
        Submit Report
      </button>
    </div>
  );
};

export default SubmitReport;

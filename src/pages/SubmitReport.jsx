import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SubmitReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [initialReport, setInitialReport] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [updateText, setUpdateText] = useState('');
  const [additionalUpdates, setAdditionalUpdates] = useState([]);

  const reportKey = course?.title;

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('submittedReports') || '{}');
    if (storedReports[reportKey]) {
      const existing = storedReports[reportKey];
      setInitialReport(existing.initialReport);
      setAdditionalUpdates(existing.additionalUpdates || []);
      setIsSubmitted(true);
    }
  }, [reportKey]);

  const handleInitialSubmit = () => {
    if (!initialReport.trim()) {
      alert('Please enter a course report before submitting.');
      return;
    }

    const storedReports = JSON.parse(localStorage.getItem('submittedReports') || '{}');
    storedReports[reportKey] = {
      initialReport,
      additionalUpdates: []
    };
    localStorage.setItem('submittedReports', JSON.stringify(storedReports));
    alert('Report submitted successfully!');
    navigate('/my-courses');
  };

  const handleAdditionalUpdate = () => {
    if (!updateText.trim()) {
      alert('Please enter update text.');
      return;
    }

    const storedReports = JSON.parse(localStorage.getItem('submittedReports') || '{}');
    const courseReport = storedReports[reportKey] || { initialReport: '', additionalUpdates: [] };

    const updatedList = [...courseReport.additionalUpdates, {
      text: updateText,
      timestamp: new Date().toLocaleString()
    }];

    storedReports[reportKey] = {
      ...courseReport,
      additionalUpdates: updatedList
    };

    localStorage.setItem('submittedReports', JSON.stringify(storedReports));
    setAdditionalUpdates(updatedList);
    setUpdateText('');
    alert('Additional update submitted.');
  };

  if (!course) {
    return <div className="p-4 text-red-500">Course not found.</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white min-h-screen shadow">
      <h1 className="text-xl font-semibold mb-2">{course.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{course.date} – {course.location}</p>

      {/* Initial Report */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Course Report:</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          rows={6}
          disabled={isSubmitted}
          value={initialReport}
          onChange={(e) => setInitialReport(e.target.value)}
          placeholder="Enter the full course report here..."
        />
      </div>

      {!isSubmitted && (
        <button
          onClick={handleInitialSubmit}
          className="w-full bg-orange-500 text-white py-2 rounded font-semibold"
        >
          Submit Report
        </button>
      )}

      {/* Additional Updates Section */}
      {isSubmitted && (
        <>
          <h2 className="text-sm font-semibold mt-6 mb-2">Additional Updates</h2>

          {additionalUpdates.length > 0 && (
            <div className="mb-4 space-y-2 text-sm">
              {additionalUpdates.map((update, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded border text-gray-700"
                >
                  <p className="text-xs text-gray-500 mb-1">{update.timestamp}</p>
                  <p>{update.text}</p>
                </div>
              ))}
            </div>
          )}

          <textarea
            className="w-full border px-3 py-2 rounded mb-2"
            rows={4}
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            placeholder="Add a new update..."
          />

          <button
            onClick={handleAdditionalUpdate}
            className="w-full bg-green-600 text-white py-2 rounded font-semibold"
          >
            Submit Update
          </button>
        </>
      )}
    </div>
  );
};

export default SubmitReport;

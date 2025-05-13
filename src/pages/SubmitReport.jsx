// src/pages/SubmitReport.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getReport, updateReport, addUpdateToReport } from '../data/reportStore';

const SubmitReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [report, setReport] = useState(null);
  const [additionalUpdates, setAdditionalUpdates] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (course?.title) {
      const existing = getReport(course.title);
      if (existing) {
        setReport(existing);
        setSubmitted(true);
      } else {
        setReport({
          courseTitle: course.title,
          whatWentWell: '',
          whatToImprove: '',
          generalFeedback: '',
          updates: [],
        });
      }
    }
  }, [course]);

  const handleSubmit = () => {
    if (!submitted) {
      updateReport(course.title, report);
      setSubmitted(true);
      navigate('/my-courses');
    } else if (additionalUpdates.trim() !== '') {
      const timestamp = new Date().toLocaleString();
      const newUpdate = { content: additionalUpdates, timestamp };
      addUpdateToReport(course.title, newUpdate);
      setReport(prev => ({
        ...prev,
        updates: [...prev.updates, newUpdate],
      }));
      setAdditionalUpdates('');
      navigate('/my-courses');
    }
  };

  if (!course) return <p>No course selected.</p>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit Report</h2>
      <p className="text-sm text-gray-600 mb-2">{course.title}</p>

      {report && (
        <>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium">What went well?</label>
              <textarea
                className="w-full border rounded p-2"
                value={report.whatWentWell}
                onChange={e =>
                  setReport({ ...report, whatWentWell: e.target.value })
                }
                disabled={submitted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">What could be improved?</label>
              <textarea
                className="w-full border rounded p-2"
                value={report.whatToImprove}
                onChange={e =>
                  setReport({ ...report, whatToImprove: e.target.value })
                }
                disabled={submitted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">General feedback</label>
              <textarea
                className="w-full border rounded p-2"
                value={report.generalFeedback}
                onChange={e =>
                  setReport({ ...report, generalFeedback: e.target.value })
                }
                disabled={submitted}
              />
            </div>
          </div>

          {submitted && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Additional Updates</h3>
              {report.updates?.map((u, i) => (
                <div key={i} className="mb-2 p-2 border rounded bg-gray-100">
                  <p className="text-sm">{u.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{u.timestamp}</p>
                </div>
              ))}
              <textarea
                className="w-full border rounded p-2 mt-2"
                placeholder="Add a new update..."
                value={additionalUpdates}
                onChange={e => setAdditionalUpdates(e.target.value)}
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-2 rounded mt-4"
          >
            {submitted ? 'Submit Update' : 'Submit Report'}
          </button>
        </>
      )}
    </div>
  );
};

export default SubmitReport;

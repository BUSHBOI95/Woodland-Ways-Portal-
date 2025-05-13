// src/data/reportStore.js

export const addReport = (courseTitle, reportData) => {
  const existingReports = JSON.parse(localStorage.getItem('submittedReports') || '{}');
  existingReports[courseTitle] = {
    initialReport: reportData,
    updates: []
  };
  localStorage.setItem('submittedReports', JSON.stringify(existingReports));
};

export const updateReport = (courseTitle, updatedReportData) => {
  const reports = JSON.parse(localStorage.getItem('submittedReports') || '{}');
  if (reports[courseTitle]) {
    reports[courseTitle].initialReport = updatedReportData;
    localStorage.setItem('submittedReports', JSON.stringify(reports));
  }
};

export const addUpdateToReport = (courseTitle, updateText) => {
  const reports = JSON.parse(localStorage.getItem('submittedReports') || '{}');
  if (reports[courseTitle]) {
    reports[courseTitle].updates = reports[courseTitle].updates || [];
    reports[courseTitle].updates.push({
      text: updateText,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('submittedReports', JSON.stringify(reports));
  }
};

export const getReport = (courseTitle) => {
  const reports = JSON.parse(localStorage.getItem('submittedReports') || '{}');
  return reports[courseTitle] || null;
};

export const getAllReports = () => {
  return JSON.parse(localStorage.getItem('submittedReports') || '{}');
};

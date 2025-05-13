// src/data/reportStore.js

const STORAGE_KEY = 'submittedReports';

// Get all stored reports
export const getAllReports = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
};

// Get a specific report by course title
export const getReport = (courseTitle) => {
  const reports = getAllReports();
  return reports[courseTitle] || null;
};

// Add a new report
export const addReport = (courseTitle, reportData) => {
  const reports = getAllReports();
  reports[courseTitle] = {
    initialReport: reportData,
    updates: []
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

// Update the initial report
export const updateReport = (courseTitle, updatedData) => {
  const reports = getAllReports();
  if (!reports[courseTitle]) return;

  reports[courseTitle].initialReport = updatedData;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

// Append an additional update to the report
export const addUpdateToReport = (courseTitle, updateText) => {
  const reports = getAllReports();
  if (!reports[courseTitle]) return;

  const update = {
    text: updateText,
    timestamp: new Date().toISOString()
  };

  if (!reports[courseTitle].updates) {
    reports[courseTitle].updates = [];
  }

  reports[courseTitle].updates.push(update);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

// Used in ReportArchive.jsx — get all reports (shortcut)
export const getReports = () => getAllReports();

// Get reports filtered by year (used in archive screen)
export const getReportsByYear = (year) => {
  const reports = getAllReports();
  const filtered = {};
  Object.keys(reports).forEach((title) => {
    const report = reports[title];
    const date = new Date(report?.initialReport?.date || '');
    if (date.getFullYear() === parseInt(year)) {
      filtered[title] = report;
    }
  });
  return filtered;
};

// Get reports filtered by course type
export const getReportsByType = (typeKeyword) => {
  const reports = getAllReports();
  const filtered = {};
  Object.keys(reports).forEach((title) => {
    if (title.toLowerCase().includes(typeKeyword.toLowerCase())) {
      filtered[title] = reports[title];
    }
  });
  return filtered;
};

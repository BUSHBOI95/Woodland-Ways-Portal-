const reports = [];

// Add or update a report
export const saveReport = (newReport) => {
  const index = reports.findIndex(r => r.course.title === newReport.course.title);
  if (index !== -1) {
    reports[index] = newReport;
  } else {
    reports.push(newReport);
  }
};

// Get all reports
export const getReports = () => {
  return reports;
};

// Filter reports by year
export const getReportsByYear = (year) => {
  return reports.filter(r => new Date(r.submittedAt).getFullYear() === parseInt(year));
};

// Filter by course type keyword (e.g. "foraging", "fire")
export const getReportsByType = (keyword) => {
  return reports.filter(r => r.course.title.toLowerCase().includes(keyword.toLowerCase()));
};

// Get single report by course title
export const getReportByCourse = (courseTitle) => {
  return reports.find(r => r.course.title === courseTitle);
};

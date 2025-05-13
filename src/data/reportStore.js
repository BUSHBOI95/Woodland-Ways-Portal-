// Temp report store (acts like a mock backend)

const reports = [];

export const addReport = (newReport) => {
  reports.push(newReport);
};

export const getReports = () => {
  return reports;
};

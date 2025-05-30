import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import MyCourses from './pages/MyCourses';
import Calendar from './pages/Calendar';
import Handbook from './pages/Handbook';
import MenuPage from './pages/Menu';
import Photos from './pages/Photos';
import Events from './pages/Events';
import Directory from './pages/Directory';
import Login from './pages/Login';
import SplashScreen from './pages/SplashScreen';
import SubmitReport from './pages/SubmitReport';
import GenerateInvoice from './pages/GenerateInvoice';
import ReportArchive from './pages/ReportArchive';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/handbook" element={<Handbook />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/photos" element={<Photos />} />
      <Route path="/events" element={<Events />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/login" element={<Login />} />
      <Route path="/splash" element={<SplashScreen />} />
      <Route path="/submit-report" element={<SubmitReport />} />
      <Route path="/generate-invoice" element={<GenerateInvoice />} />
      <Route path="/report-archive" element={<ReportArchive />} />
    </Routes>
  );
};

export default App;

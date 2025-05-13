import React from 'react';
import { Assignment, CalendarMonth, MenuBook, Menu, Home } from '@mui/icons-material';

const Handbook = () => {
  const documents = [
    {
      title: "Instructor Code of Conduct",
      description: "Guidelines for expected behaviour during courses.",
      link: "#"
    },
    {
      title: "First Aid Protocol",
      description: "Step-by-step guide for managing incidents.",
      link: "#"
    },
    {
      title: "Knife Safety & Legal Policy",
      description: "UK law and company policy for edge tool usage.",
      link: "#"
    },
    {
      title: "Kit List – 2 Day Course",
      description: "Standard kit checklist for instructors.",
      link: "#"
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-lg font-semibold">Handbook</h1>
        <div className="text-2xl">📘</div>
      </header>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {documents.map((doc, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold text-gray-800 text-sm">{doc.title}</h2>
            <p className="text-xs text-gray-600 mb-2">{doc.description}</p>
            <a
              href={doc.link}
              className="inline-block text-xs text-orange-600 font-medium underline"
            >
              View Document
            </a>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <div className="flex flex-col items-center">
            <Home fontSize="medium" />
            <span className="text-[11px]">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <Assignment fontSize="medium" />
            <span className="text-[11px]">My Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <CalendarMonth fontSize="medium" />
            <span className="text-[11px]">Calendar</span>
          </div>
          <div className="flex flex-col items-center">
            <MenuBook fontSize="medium" className="text-orange-500" />
            <span className="text-[11px]">Handbook</span>
          </div>
          <div className="flex flex-col items-center">
            <Menu fontSize="medium" />
            <span className="text-[11px]">Menu</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Handbook;

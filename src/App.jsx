import React from 'react';

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center px-4 py-2 border-b border-gray-200 shadow-sm">
        <img src="/Icon.png" alt="Woodland Ways Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-semibold text-orange-600">Woodland Ways</h1>
      </header>

      {/* Post Box */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Post an update..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"
        />
      </div>

      {/* Sample Post */}
      <div className="p-4 border-b border-gray-200">
        <div className="text-sm text-gray-700">"Course went great today! Loads of happy faces."</div>
        <div className="text-xs text-gray-400 mt-1">– Joe, 2 hours ago</div>
      </div>

      {/* Spacer to push footer to bottom */}
      <div className="flex-grow" />

      {/* Footer Navigation */}
      <nav className="flex justify-around items-center border-t border-gray-300 py-2 bg-white">
        <button className="text-orange-600 text-xs flex flex-col items-center">
          <span className="material-icons">home</span>
          Home
        </button>
        <button className="text-gray-600 text-xs flex flex-col items-center">
          <span className="material-icons">assignment</span>
          My Courses
        </button>
        <button className="text-gray-600 text-xs flex flex-col items-center">
          <span className="material-icons">calendar_month</span>
          Calendar
        </button>
        <button className="text-gray-600 text-xs flex flex-col items-center">
          <span className="material-icons">menu_book</span>
          Handbook
        </button>
        <button className="text-gray-600 text-xs flex flex-col items-center">
          <span className="material-icons">menu</span>
          Menu
        </button>
      </nav>
    </div>
  );
}

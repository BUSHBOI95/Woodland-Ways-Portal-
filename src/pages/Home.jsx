import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="w-full bg-orange-500 py-4 px-6 flex justify-between items-center">
        <h1 className="text-white text-lg font-semibold">Staff Portal</h1>
        <div className="text-white text-2xl">•••</div>
      </div>

      {/* Logo */}
      <div className="mt-6">
        <img src="/icon.png" alt="Woodland Ways Logo" className="w-40 h-auto" />
      </div>

      {/* What’s on your mind */}
      <div className="mt-6 w-[90%]">
        <input
          type="text"
          placeholder="What’s on your mind?"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm">Photos</button>
        <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm">Events</button>
        <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm">Directory</button>
      </div>

      {/* Feed */}
      <div className="mt-6 w-[90%] bg-gray-100 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <img src="/icon.png" alt="Avatar" className="w-8 h-8 rounded-full" />
          <div>
            <p className="font-semibold text-sm">Jon Magellan</p>
            <p className="text-xs text-gray-500">26m ago</p>
          </div>
        </div>
        <p className="text-sm">Hi all. I’ve knocked these up for the show to use…</p>
      </div>

      {/* Bottom nav bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2">
        <div className="flex flex-col items-center text-orange-500">
          <span className="text-lg">🏠</span>
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg">📚</span>
          <span className="text-xs">My Courses</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg">🗓️</span>
          <span className="text-xs">Calendar</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg">📖</span>
          <span className="text-xs">Handbook</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg">🔔</span>
          <span className="text-xs">Notifications</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg">☰</span>
          <span className="text-xs">More</span>
        </div>
      </div>
    </div>
  );
};

export default Home;

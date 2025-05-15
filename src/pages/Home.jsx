import React, { useState } from 'react';
import { Home, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Jon Magellan',
      content: "All sorted. I’ve knocked these up for the show to use.",
      time: '2h ago',
    },
    {
      id: 2,
      author: 'Sophie Kent',
      content: "Can someone bring a bow drill set for the fire demo this weekend?",
      time: '5h ago',
    }
  ]);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const newEntry = {
        id: posts.length + 1,
        author: 'You',
        content: newPost,
        time: 'Just now'
      };
      setPosts([newEntry, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="px-4 py-3 bg-orange-500 text-white flex items-center justify-between">
        <h1 className="text-lg font-semibold">Staff Portal</h1>
        <div className="text-2xl">🦌</div>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
        {/* New Post Input */}
        <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm">
          <textarea
            className="w-full border-none focus:outline-none resize-none text-sm"
            rows="2"
            placeholder="What’s on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handlePostSubmit}
              className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm"
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-100 rounded-xl shadow-sm p-3 space-y-1">
              <div className="text-sm font-semibold text-gray-800">{post.author}</div>
              <div className="text-sm text-gray-700">{post.content}</div>
              <div className="text-[11px] text-gray-500">{post.time}</div>

              {/* Action Buttons */}
              <div className="flex gap-6 text-xs text-gray-600 pt-2">
                <button className="hover:text-orange-500 transition">Like</button>
                <button className="hover:text-orange-500 transition">Comment</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <NavLink to="/" className="flex flex-col items-center text-orange-500">
            <Home fontSize="medium" />
            <span className="text-[11px]">Home</span>
          </NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center">
            <Assignment fontSize="medium" />
            <span className="text-[11px]">My Courses</span>
          </NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center">
            <CalendarMonth fontSize="medium" />
            <span className="text-[11px]">Calendar</span>
          </NavLink>
          <NavLink to="/handbook" className="flex flex-col items-center">
            <MenuBook fontSize="medium" />
            <span className="text-[11px]">Handbook</span>
          </NavLink>
          <NavLink to="/menu" className="flex flex-col items-center">
            <Menu fontSize="medium" />
            <span className="text-[11px]">Menu</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;

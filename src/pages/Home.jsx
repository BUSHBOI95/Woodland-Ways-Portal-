import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Home, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';

const HomePage = () => {
  const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem('homePosts') || '[]'));
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('homePosts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (!input.trim()) return;
    const newPost = {
      name: 'Jon Magellan',
      role: 'All-star contributor',
      message: input,
      timestamp: new Date().toISOString(),
      avatar: '/avatar.jpg'
    };
    setPosts([newPost, ...posts]);
    setInput('');
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diff = Math.floor((now - posted) / 3600000);
    return diff === 0 ? 'Just now' : `${diff}h ago`;
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      <header className="bg-orange-500 p-4 flex justify-center items-center">
        <img src={logo} alt="Woodland Ways Logo" className="h-8 object-contain" />
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <div className="bg-gray-100 p-3 mt-4 mb-4 rounded-xl">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 rounded border text-sm"
            placeholder="What's on your mind?"
          />
          <div className="text-right mt-2">
            <button
              onClick={handlePost}
              className="bg-orange-500 text-white px-4 py-1 text-sm rounded-full"
            >
              Post
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <img src={post.avatar} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{post.name}</p>
                  <p className="text-xs text-gray-500">{post.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{post.message}</p>
              <p className="text-xs text-gray-500 mb-2">{formatTime(post.timestamp)}</p>
              <div className="flex justify-around text-xs text-gray-600 border-t pt-2">
                <button className="hover:text-orange-500">Like</button>
                <button className="hover:text-orange-500">Comment</button>
                <button className="hover:text-orange-500">Send</button>
              </div>
            </div>
          ))}
        </div>
      </div>

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

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';
import { FaThumbsUp, FaCommentAlt, FaPaperPlane } from 'react-icons/fa';
import Logo from '../../Icon.png';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('ww-posts');
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  const handlePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      text: postText,
      timestamp: new Date().toLocaleString(),
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('ww-posts', JSON.stringify(updated));
    setPostText('');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white relative">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-4">
        {/* Large Center Logo */}
        <div className="flex justify-center py-4">
          <img src={Logo} alt="Woodland Ways Logo" className="h-28 w-auto object-contain" />
        </div>

        {/* Post Box */}
        <div className="bg-gray-100 rounded-xl p-3 shadow">
          <textarea
            rows={3}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share an update..."
            className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none"
          />
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm mt-2 float-right"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <div key={post.id} className="bg-white border rounded-lg p-3 shadow">
            <div className="flex items-center space-x-2 mb-2">
              <img
                src={Logo}
                alt="Avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm">Woodland Ways</p>
                <p className="text-xs text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <p className="text-sm text-gray-800">{post.text}</p>
            <div className="flex justify-around mt-3 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <FaThumbsUp size={14} />
                <span>Like</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCommentAlt size={14} />
                <span>Comment</span>
              </div>
              <div className="flex items-center gap-1">
                <FaPaperPlane size={14} />
                <span>Send</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <NavLink to="/" className="flex flex-col items-center text-orange-500">
            <HomeIcon fontSize="medium" />
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

export default Home;

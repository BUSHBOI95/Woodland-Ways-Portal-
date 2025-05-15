import React, { useState, useEffect } from 'react';
import '../../Icon.png'; // Preload for Vercel
import Icon from '../../Icon.png';
import { Home, Assignment, CalendarMonth, MenuBook, Menu, ThumbUp, ChatBubbleOutline, Send } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('staffPosts') || '[]');
    setPosts(savedPosts);
  }, []);

  const handlePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      name: 'Jon Magellan',
      role: 'All-star contributor',
      text: postText.trim(),
      timestamp: new Date().toISOString(),
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('staffPosts', JSON.stringify(updated));
    setPostText('');
  };

  const timeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    return diff < 1 ? 'just now' : `${diff}m ago`;
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col justify-between">
      {/* Header */}
      <header className="bg-orange-500 text-white py-3 px-4 text-center text-lg font-bold">
        Staff Portal
      </header>

      <main className="flex-1 px-4 pb-24">
        {/* Logo */}
        <div className="flex justify-center mt-6">
          <img src={Icon} alt="Woodland Ways" className="w-40 h-auto" />
        </div>

        {/* Post Box */}
        <div className="mt-4 bg-gray-50 p-3 rounded-xl shadow">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded mb-3"
          />
          <div className="flex justify-between flex-wrap gap-2">
            <button className="bg-orange-400 text-white rounded-full px-4 py-2 text-xs">Photos</button>
            <button className="bg-orange-400 text-white rounded-full px-4 py-2 text-xs">Events</button>
            <button className="bg-orange-400 text-white rounded-full px-4 py-2 text-xs">Directory</button>
            <button onClick={handlePost} className="bg-orange-500 text-white rounded-full px-4 py-2 text-xs">Post</button>
          </div>
        </div>

        {/* Feed */}
        <div className="mt-6 space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-100 p-3 rounded-xl shadow">
              <div className="flex items-center gap-3 mb-1">
                <img src={Icon} alt="avatar" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">{post.name}</p>
                  <p className="text-[11px] text-gray-500">{post.role} · {timeAgo(post.timestamp)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{post.text}</p>
              <div className="flex justify-around text-gray-600 text-xs border-t border-gray-300 pt-2">
                <div className="flex items-center gap-1"><ThumbUp fontSize="small" /> Like</div>
                <div className="flex items-center gap-1"><ChatBubbleOutline fontSize="small" /> Comment</div>
                <div className="flex items-center gap-1"><Send fontSize="small" /> Send</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-50">
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

export default Home;

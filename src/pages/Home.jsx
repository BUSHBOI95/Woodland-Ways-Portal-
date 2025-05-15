import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';
import logo from '../../Icon.png'; // Adjust path if your logo is elsewhere

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('staffPosts') || '[]');
    setPosts(savedPosts);
  }, []);

  const handlePost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      name: 'Jon Magellan', // Replace with dynamic name in future
      content: newPost,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('staffPosts', JSON.stringify(updatedPosts));
    setNewPost('');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-orange-500 text-white">
        <div className="w-9 h-9">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
      </header>

      {/* Main Feed */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="bg-gray-100 rounded-xl p-3 shadow mb-4">
          <textarea
            className="w-full p-2 rounded border text-sm"
            rows={2}
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button
            className="bg-orange-500 text-white text-sm px-4 py-1 mt-2 rounded-full float-right"
            onClick={handlePost}
          >
            Post
          </button>
        </div>

        {/* Post Feed */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-100 rounded-xl p-4 mb-3 shadow-sm"
          >
            <div className="flex items-center mb-1">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{post.name}</p>
                <p className="text-[11px] text-gray-500">{post.time}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2">{post.content}</p>
            <div className="flex justify-start gap-6 mt-3 text-sm text-gray-600">
              <button className="hover:text-blue-600">Like</button>
              <button className="hover:text-blue-600">Comment</button>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Navigation */}
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

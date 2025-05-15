import React, { useState, useEffect } from 'react';
import { Home, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';
import Logo from '../assets/Icon.png';

const HomePage = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('homePosts');
    return saved ? JSON.parse(saved) : [];
  });

  const handlePost = () => {
    if (postContent.trim() === '') return;
    const newPost = {
      id: Date.now(),
      name: 'Jon Magellan',
      role: 'All-star contributor',
      time: 'just now',
      content: postContent,
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('homePosts', JSON.stringify(updatedPosts));
    setPostContent('');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="bg-orange-500 text-white py-4 px-4 text-center">
        <h1 className="text-xl font-semibold">Staff Portal</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {/* Large Logo */}
        <div className="flex justify-center my-4">
          <img src={Logo} alt="Woodland Ways Logo" className="w-40 h-auto" />
        </div>

        {/* Post Input */}
        <div className="bg-gray-100 p-4 rounded-xl mb-4">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 mb-3"
          />
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm">Photos</button>
            <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm">Events</button>
            <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm">Directory</button>
            <button
              onClick={handlePost}
              className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm"
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <div className="flex items-center mb-1">
                <img src={Logo} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                <div>
                  <p className="font-semibold text-sm">{post.name}</p>
                  <p className="text-xs text-gray-500">{post.role} · {post.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{post.content}</p>
              <div className="flex gap-6 text-gray-600 text-sm">
                <button className="flex items-center gap-1"><span>👍</span> Like</button>
                <button className="flex items-center gap-1"><span>💬</span> Comment</button>
                <button className="flex items-center gap-1"><span>➡️</span> Send</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <div className="flex flex-col items-center text-orange-500">
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
            <MenuBook fontSize="medium" />
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

export default HomePage;

import React, { useState, useEffect } from 'react';
import { Home, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';
import icon from '../Icon.png';

const HomePage = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  // Load saved posts on mount
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('staffPosts')) || [];
    setPosts(savedPosts);
  }, []);

  // Handle new post submission
  const handlePost = () => {
    if (!postContent.trim()) return;
    const newPost = {
      id: Date.now(),
      author: 'Jon Magellan',
      avatar: icon,
      badge: 'All-star contributor',
      content: postContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('staffPosts', JSON.stringify(updatedPosts));
    setPostContent('');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col justify-between shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-center px-4 py-4 bg-orange-500 text-white">
        <h1 className="text-2xl font-bold tracking-wide">Staff Portal</h1>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={icon} alt="Woodland Ways Logo" className="w-48 h-auto" />
        </div>

        {/* Post Box */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-full text-sm mb-3"
          />
          <div className="flex justify-between flex-wrap gap-2">
            <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-xs">Photos</button>
            <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-xs">Events</button>
            <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-xs">Directory</button>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-full text-xs"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>

        {/* Post Feed */}
        <div className="mt-6 space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <img src={post.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                <div>
                  <div className="text-sm font-semibold text-gray-800">{post.author}</div>
                  <div className="text-[11px] text-gray-500">{post.badge} • {post.timestamp}</div>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{post.content}</p>
              <div className="flex space-x-6 text-sm text-gray-500">
                <button className="flex items-center space-x-1">
                  <span className="material-icons text-sm">thumb_up_alt</span><span>Like</span>
                </button>
                <button className="flex items-center space-x-1">
                  <span className="material-icons text-sm">chat_bubble_outline</span><span>Comment</span>
                </button>
                <button className="flex items-center space-x-1">
                  <span className="material-icons text-sm">send</span><span>Send</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <div className="flex flex-col items-center text-orange-500">
            <Home fontSize="small" />
            <span className="text-[11px]">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <Assignment fontSize="small" />
            <span className="text-[11px]">My Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <CalendarMonth fontSize="small" />
            <span className="text-[11px]">Calendar</span>
          </div>
          <div className="flex flex-col items-center">
            <MenuBook fontSize="small" />
            <span className="text-[11px]">Handbook</span>
          </div>
          <div className="flex flex-col items-center">
            <Menu fontSize="small" />
            <span className="text-[11px]">Menu</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;

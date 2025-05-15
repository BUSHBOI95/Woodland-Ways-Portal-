import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaThumbsUp, FaCommentAlt, FaPaperPlane } from 'react-icons/fa';
import WWLogo from '../../assets/Logo.png';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('staffPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('staffPosts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        text: postText,
        timestamp: new Date().toISOString(),
        likes: 0
      };
      setPosts([newPost, ...posts]);
      setPostText('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white relative">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      {/* Feed Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Logo */}
        <div className="flex justify-center my-2">
          <img src={WWLogo} alt="Woodland Ways Logo" className="h-24 w-auto" />
        </div>

        {/* Post Box */}
        <div className="bg-gray-100 p-3 rounded-xl shadow-sm">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share an update with the team..."
            className="w-full p-2 rounded border resize-none text-sm"
          />
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white px-4 py-1 mt-2 rounded-full float-right text-xs"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <img
                src={WWLogo}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">Woodland Ways</p>
                <p className="text-[11px] text-gray-500">
                  {new Date(post.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-800 mt-2">{post.text}</p>

            {/* Icons */}
            <div className="flex justify-around text-gray-500 mt-2 pt-2 border-t text-xs">
              <div className="flex items-center gap-1 cursor-pointer">
                <FaThumbsUp className="text-sm" />
                <span>Like</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <FaCommentAlt className="text-sm" />
                <span>Comment</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <FaPaperPlane className="text-sm" />
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
            <FaThumbsUp className="text-lg" />
            <span className="text-[11px]">Home</span>
          </NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center">
            <FaCommentAlt className="text-lg" />
            <span className="text-[11px]">Courses</span>
          </NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center">
            <FaPaperPlane className="text-lg" />
            <span className="text-[11px]">Calendar</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Home;

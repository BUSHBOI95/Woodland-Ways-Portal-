import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaThumbsUp, FaCommentAlt, FaPaperPlane } from 'react-icons/fa';
import moment from 'moment';
import WWLogo from '../../Icon.png';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('staffPortalPosts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('staffPortalPosts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim() === '') return;
    const newPost = {
      id: Date.now(),
      text: postText,
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    setPosts([newPost, ...posts]);
    setPostText('');
  };

  const toggleLike = (postId) => {
    const updated = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updated);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-orange-500 text-white text-center py-3 shadow-md">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 pt-4 pb-20">
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            rows="3"
            placeholder="What’s on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button
            onClick={handlePost}
            className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm float-right"
          >
            Post
          </button>
        </div>

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm p-4 mb-4 text-sm"
          >
            <div className="flex items-center mb-2">
              <img
                src={WWLogo}
                alt="avatar"
                className="w-12 h-12 rounded-full mr-3 object-cover border border-gray-300"
              />
              <div>
                <p className="font-semibold text-gray-800 leading-tight">
                  Woodland Ways
                </p>
                <p className="text-xs text-gray-500">
                  {moment(post.timestamp).fromNow()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{post.text}</p>
            <div className="flex justify-between text-gray-500 text-xs mt-2">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-1"
              >
                <FaThumbsUp />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1">
                <FaCommentAlt />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-1">
                <FaPaperPlane />
                <span>Send</span>
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Nav */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <NavLink to="/" className="flex flex-col items-center">
            <span className="text-lg">🏠</span>
            <span>Home</span>
          </NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center">
            <span className="text-lg">📄</span>
            <span>Courses</span>
          </NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center">
            <span className="text-lg">📆</span>
            <span>Calendar</span>
          </NavLink>
          <NavLink to="/photos" className="flex flex-col items-center">
            <span className="text-lg">📷</span>
            <span>Photos</span>
          </NavLink>
          <NavLink to="/menu" className="flex flex-col items-center">
            <span className="text-lg">☰</span>
            <span>Menu</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Home;

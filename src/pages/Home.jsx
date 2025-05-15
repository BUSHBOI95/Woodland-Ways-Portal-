// FILE: src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import WWLogo from '../assets/Icon.png';
import { ThumbUpAltOutlined, ChatBubbleOutlineOutlined, SendOutlined } from '@mui/icons-material';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("staffPosts") || "[]");
    setPosts(savedPosts);
  }, []);

  const handlePost = () => {
    if (!postContent.trim()) return;
    const newPost = {
      name: "Jon Magellan",
      badge: "All-star contributor",
      avatar: WWLogo,
      content: postContent,
      timestamp: new Date().toISOString()
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("staffPosts", JSON.stringify(updatedPosts));
    setPostContent("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 60000); // minutes
    if (diff < 1) return "just now";
    if (diff < 60) return `${diff}m ago`;
    return date.toLocaleTimeString();
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-xl font-bold tracking-wide">Staff Portal</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img src={WWLogo} alt="Woodland Ways Logo" className="w-32 h-auto my-4" />
        </div>

        {/* Post Input */}
        <div className="bg-gray-50 border rounded-xl shadow px-4 py-3 mb-4">
          <input
            type="text"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full text-sm px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring mt-1"
          />
          <div className="flex justify-between mt-3 gap-2">
            <button className="flex-1 bg-orange-400 text-white px-4 py-2 rounded-full text-xs">Photos</button>
            <button className="flex-1 bg-orange-400 text-white px-4 py-2 rounded-full text-xs">Events</button>
            <button className="flex-1 bg-orange-400 text-white px-4 py-2 rounded-full text-xs">Directory</button>
            <button
              onClick={handlePost}
              className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-full text-xs"
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <img src={post.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{post.name}</p>
                  <p className="text-[11px] text-gray-500">{post.badge} • {formatTime(post.timestamp)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mt-2">{post.content}</p>
              <div className="flex justify-around text-gray-600 text-xs mt-3">
                <button className="flex items-center gap-1"><ThumbUpAltOutlined fontSize="small" />Like</button>
                <button className="flex items-center gap-1"><ChatBubbleOutlineOutlined fontSize="small" />Comment</button>
                <button className="flex items-center gap-1"><SendOutlined fontSize="small" />Send</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;

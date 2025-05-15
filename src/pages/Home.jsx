import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { ThumbUpAltOutlined, ChatBubbleOutline, Send } from '@mui/icons-material';
import logo from '../../Icon.png';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("feedPosts") || "[]");
    setPosts(saved);
  }, []);

  const handlePost = () => {
    if (newPost.trim() === "") return;

    const post = {
      id: Date.now(),
      name: "Jon Magellan",
      badge: "All-star contributor",
      avatar: logo,
      content: newPost,
      timestamp: new Date().toISOString(),
    };

    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem("feedPosts", JSON.stringify(updated));
    setNewPost("");
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (diff < 1) return "just now";
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      {/* Header */}
      <header className="bg-orange-500 py-3 px-4 text-white flex justify-center items-center relative">
        <h1 className="text-lg font-semibold absolute left-4">Staff Portal</h1>
        <img src={logo} alt="Woodland Ways" className="h-10" />
      </header>

      {/* Logo */}
      <div className="flex justify-center mt-4">
        <img src={logo} alt="Woodland Ways" className="h-20" />
      </div>

      {/* Post box */}
      <div className="p-4">
        <input
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border rounded-full px-4 py-2 mb-2 shadow-sm focus:outline-none"
        />
        <div className="flex gap-2 mb-3">
          <button className="bg-orange-400 text-white px-4 py-1 rounded-full text-sm">Photos</button>
          <button className="bg-orange-400 text-white px-4 py-1 rounded-full text-sm">Events</button>
          <button className="bg-orange-400 text-white px-4 py-1 rounded-full text-sm">Directory</button>
        </div>
        <button
          onClick={handlePost}
          className="bg-orange-500 text-white px-6 py-2 rounded-full float-right"
        >
          Post
        </button>
      </div>

      {/* Feed */}
      <div className="p-4 space-y-4 mt-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Avatar src={post.avatar} alt={post.name} className="mr-2 w-8 h-8" />
              <div>
                <p className="text-sm font-semibold">{post.name}</p>
                <p className="text-xs text-gray-500">{post.badge} • {formatTimeAgo(post.timestamp)}</p>
              </div>
            </div>
            <p className="text-sm text-gray-800">{post.content}</p>
            <div className="flex justify-around mt-2 text-gray-600 text-sm">
              <div className="flex items-center gap-1"><ThumbUpAltOutlined fontSize="small" /> Like</div>
              <div className="flex items-center gap-1"><ChatBubbleOutline fontSize="small" /> Comment</div>
              <div className="flex items-center gap-1"><Send fontSize="small" /> Send</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

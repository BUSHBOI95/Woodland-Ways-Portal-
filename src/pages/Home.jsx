import React, { useState, useEffect } from 'react';
import '../../index.css';
import Logo from '../../Icon.png';
import { FaThumbsUp, FaCommentAlt, FaPaperPlane } from 'react-icons/fa';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        user: 'Jon Magellan',
        badge: 'All-star contributor',
        avatar: Logo,
        content: postText,
        timestamp: 'just now'
      };
      setPosts([newPost, ...posts]);
      setPostText('');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-24">
      {/* Header */}
      <div className="bg-orange-500 py-4 text-center">
        <h1 className="text-2xl font-bold text-white">Staff Portal</h1>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center my-4">
        <img
          src={Logo}
          alt="Woodland Ways Logo"
          className="w-48 h-auto object-contain"
        />
      </div>

      {/* Post Input Box */}
      <div className="bg-gray-100 rounded-xl p-4 mx-4 mb-4 shadow">
        <input
          type="text"
          placeholder="What’s on your mind?"
          className="w-full p-3 rounded-full border border-gray-300 mb-4 text-sm"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <div className="flex justify-between gap-2">
          <button className="bg-orange-400 text-white font-semibold py-2 px-4 rounded-full w-full">Photos</button>
          <button className="bg-orange-400 text-white font-semibold py-2 px-4 rounded-full w-full">Events</button>
          <button className="bg-orange-400 text-white font-semibold py-2 px-4 rounded-full w-full">Directory</button>
          <button
            className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-full w-full"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="mx-4 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-4 border">
            <div className="flex items-center mb-2">
              <img
                src={post.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full mr-3 object-contain"
              />
              <div>
                <p className="font-semibold">{post.user}</p>
                <p className="text-xs text-gray-500">{post.badge} · {post.timestamp}</p>
              </div>
            </div>
            <p className="mb-3">{post.content}</p>
            <div className="flex justify-around text-gray-500 text-sm">
              <button className="flex items-center gap-1">
                <FaThumbsUp /> Like
              </button>
              <button className="flex items-center gap-1">
                <FaCommentAlt /> Comment
              </button>
              <button className="flex items-center gap-1">
                <FaPaperPlane /> Send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

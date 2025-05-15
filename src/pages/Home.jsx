import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment, FaPaperPlane, FaHome, FaBook, FaCalendarAlt, FaBars, FaClipboardList } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        user: 'Woodland Ways',
        avatar: '/Icon.png',
        content: postText,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setPostText('');
    }
  };

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-GB');
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Header */}
      <div className="bg-orange-500 py-3 text-white text-center text-xl font-bold">
        Staff Portal
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center mt-4">
        <img src="/Icon.png" alt="Logo" className="w-24 h-24 object-contain mb-2" />
        <h1 className="text-xl font-semibold text-gray-800">Woodland Ways</h1>
      </div>

      {/* Post input */}
      <div className="bg-gray-50 mx-4 mt-4 p-4 rounded-lg shadow">
        <textarea
          placeholder="Share an update..."
          className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white px-4 py-2 rounded-full"
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts feed */}
      <div className="mt-4 px-4 flex-1 overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <div className="font-semibold text-sm">{post.user}</div>
                <div className="text-xs text-gray-500">{formatTimestamp(post.timestamp)}</div>
              </div>
            </div>
            <p className="mb-3 text-sm">{post.content}</p>
            <div className="flex justify-around text-gray-600 text-sm">
              <button onClick={() => handleLike(post.id)} className="flex items-center gap-1">
                <FaThumbsUp /> Like ({post.likes})
              </button>
              <button className="flex items-center gap-1">
                <FaComment /> Comment
              </button>
              <button className="flex items-center gap-1">
                <FaPaperPlane /> Send
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around bg-white border-t border-gray-200 p-2">
        <NavLink to="/" className="flex flex-col items-center text-orange-500">
          <FaHome size={20} />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink to="/mycourses" className="flex flex-col items-center text-gray-500">
          <FaClipboardList size={20} />
          <span className="text-xs">My Courses</span>
        </NavLink>
        <NavLink to="/calendar" className="flex flex-col items-center text-gray-500">
          <FaCalendarAlt size={20} />
          <span className="text-xs">Calendar</span>
        </NavLink>
        <NavLink to="/handbook" className="flex flex-col items-center text-gray-500">
          <FaBook size={20} />
          <span className="text-xs">Handbook</span>
        </NavLink>
        <NavLink to="/menu" className="flex flex-col items-center text-gray-500">
          <FaBars size={20} />
          <span className="text-xs">Menu</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaThumbsUp, FaComment, FaPaperPlane } from 'react-icons/fa';
import logo from '../../Icon.png';

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
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: 'Woodland Ways',
      text: postText,
      timestamp: new Date().toLocaleString('en-GB'),
    };
    setPosts([newPost, ...posts]);
    setPostText('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-orange-500 text-white text-center py-4">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      {/* Logo */}
      <div className="flex justify-center mt-4">
        <img src={logo} alt="Woodland Ways" className="h-24 w-auto object-contain" />
      </div>

      {/* Post input */}
      <div className="px-4 mt-4">
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-sm"
          placeholder="Share an update..."
          rows={2}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
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

      {/* Post feed */}
      <div className="flex-1 px-4 mt-4 space-y-4 overflow-y-auto pb-20">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-100 p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center mb-2">
              <img src={logo} alt="Avatar" className="w-8 h-8 rounded-full mr-3" />
              <div>
                <p className="font-semibold text-sm">{post.author}</p>
                <p className="text-xs text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <p className="text-sm text-gray-800">{post.text}</p>
            <div className="flex mt-3 space-x-6 text-gray-600 text-sm">
              <button className="flex items-center space-x-1">
                <FaThumbsUp />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1">
                <FaComment />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1">
                <FaPaperPlane />
                <span>Send</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-300">
        <nav className="flex justify-around py-2 text-gray-700 text-xs">
          <NavLink to="/" className="flex flex-col items-center text-orange-500">
            <FaPaperPlane className="text-lg" />
            <span>Home</span>
          </NavLink>
          <NavLink to="/courses" className="flex flex-col items-center">
            <i className="fas fa-book"></i>
            <span>My Courses</span>
          </NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center">
            <i className="fas fa-calendar-alt"></i>
            <span>Calendar</span>
          </NavLink>
          <NavLink to="/handbook" className="flex flex-col items-center">
            <i className="fas fa-book-open"></i>
            <span>Handbook</span>
          </NavLink>
          <NavLink to="/menu" className="flex flex-col items-center">
            <i className="fas fa-bars"></i>
            <span>Menu</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Home;

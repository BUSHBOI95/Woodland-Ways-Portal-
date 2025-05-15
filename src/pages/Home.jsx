import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaThumbsUp, FaComment, FaPaperPlane } from 'react-icons/fa';
import logo from '../../assets/Logo.png';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('ww_feed');
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  const handlePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      text: postText,
      date: new Date().toLocaleString(),
      avatar: 'https://ui-avatars.com/api/?name=WW+User'
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('ww_feed', JSON.stringify(updatedPosts));
    setPostText('');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col justify-between shadow-sm">
      {/* Header */}
      <header className="bg-orange-500 py-3 px-4 flex justify-center items-center">
        <h1 className="text-white font-bold text-lg">Staff Portal</h1>
      </header>

      {/* Feed Area */}
      <div className="flex-1 px-4 pb-20 overflow-y-auto">
        <div className="flex justify-center mt-4">
          <img src={logo} alt="Woodland Ways" className="h-24 w-auto object-contain" />
        </div>

        {/* Post Box */}
        <div className="mt-4 mb-4">
          <textarea
            className="w-full p-3 border rounded-md text-sm"
            placeholder="What's happening?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button
            onClick={handlePost}
            className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-md text-sm float-right"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-4 mt-6">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-gray-100 p-3 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={post.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-orange-300"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">WW Instructor</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{post.text}</p>
              <div className="flex justify-between text-gray-500 text-xs">
                <div className="flex items-center gap-2">
                  <FaThumbsUp className="cursor-pointer" />
                  <span>Like</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaComment className="cursor-pointer" />
                  <span>Comment</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPaperPlane className="cursor-pointer" />
                  <span>Send</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Nav */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <NavLink to="/" className="flex flex-col items-center text-orange-500">
            <span className="material-icons">home</span>
            <span>Home</span>
          </NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center">
            <span className="material-icons">assignment</span>
            <span>Courses</span>
          </NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center">
            <span className="material-icons">calendar_month</span>
            <span>Calendar</span>
          </NavLink>
          <NavLink to="/handbook" className="flex flex-col items-center">
            <span className="material-icons">menu_book</span>
            <span>Handbook</span>
          </NavLink>
          <NavLink to="/menu" className="flex flex-col items-center">
            <span className="material-icons">menu</span>
            <span>Menu</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Home;

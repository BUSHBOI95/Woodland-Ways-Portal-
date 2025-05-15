import React, { useState, useEffect } from 'react';
import { ThumbUp, ChatBubbleOutline, Send } from '@mui/icons-material';
import { Home as HomeIcon, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  const handlePost = () => {
    if (postText.trim() !== '') {
      const newPosts = [{ name: 'Jon Magellan', role: 'All-star contributor', text: postText, time: 'just now' }, ...posts];
      setPosts(newPosts);
      localStorage.setItem('posts', JSON.stringify(newPosts));
      setPostText('');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* Header */}
      <div className="w-full bg-orange-500 py-4 text-center">
        <h1 className="text-white text-2xl font-bold">Staff Portal</h1>
      </div>

      {/* Main Logo */}
      <div className="my-6">
        <img src="../../Icon.png" alt="Woodland Ways Logo" className="w-48 h-48 mx-auto" />
      </div>

      {/* Post Box */}
      <div className="w-[90%] bg-gray-100 p-4 rounded-xl shadow-sm">
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full px-4 py-2 border border-gray-300 rounded-full mb-4 focus:outline-none"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full">Photos</button>
          <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full">Events</button>
          <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full">Directory</button>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="w-[90%] mt-6 space-y-4 mb-32">
        {posts.map((post, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-sm">
            <div className="flex items-center mb-2">
              <img src="../../Icon.png" alt="avatar" className="w-8 h-8 rounded-full mr-3" />
              <div>
                <p className="font-bold text-sm">{post.name}</p>
                <p className="text-xs text-gray-500">{post.role} · {post.time}</p>
              </div>
            </div>
            <p className="text-sm mb-2">{post.text}</p>
            <div className="flex space-x-6 mt-2 text-gray-600">
              <button className="flex items-center space-x-1">
                <ThumbUp fontSize="small" />
                <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center space-x-1">
                <ChatBubbleOutline fontSize="small" />
                <span className="text-sm">Comment</span>
              </button>
              <button className="flex items-center space-x-1">
                <Send fontSize="small" />
                <span className="text-sm">Send</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-md">
        <div className="flex justify-around py-2">
          <NavLink to="/" className="flex flex-col items-center text-orange-500">
            <HomeIcon fontSize="medium" />
            <span className="text-xs">Home</span>
          </NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center text-gray-600">
            <Assignment fontSize="medium" />
            <span className="text-xs">My Courses</span>
          </NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center text-gray-600">
            <CalendarMonth fontSize="medium" />
            <span className="text-xs">Calendar</span>
          </NavLink>
          <NavLink to="/handbook" className="flex flex-col items-center text-gray-600">
            <MenuBook fontSize="medium" />
            <span className="text-xs">Handbook</span>
          </NavLink>
          <NavLink to="/menu" className="flex flex-col items-center text-gray-600">
            <Menu fontSize="medium" />
            <span className="text-xs">Menu</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Home;

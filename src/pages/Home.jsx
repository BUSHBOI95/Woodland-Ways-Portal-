import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { FaThumbsUp, FaRegCommentDots, FaShare } from 'react-icons/fa';
import Icon from '../../Icon.png';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('staffPortalPosts');
    if (stored) {
      setPosts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('staffPortalPosts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        text: postText.trim(),
        timestamp: new Date().toISOString(),
        likes: 0
      };
      setPosts([newPost, ...posts]);
      setPostText('');
    }
  };

  const handleLike = (id) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white relative">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      {/* Scrollable Feed */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 mb-2 text-sm resize-none"
            rows={3}
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm float-right"
            onClick={handlePost}
          >
            Post
          </button>
        </div>

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-50 p-4 rounded-xl border shadow-sm"
          >
            <div className="flex items-center mb-2">
              <img src={Icon} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-semibold text-sm text-gray-800">Woodland Ways</p>
                <p className="text-xs text-gray-500">
                  {moment(post.timestamp).fromNow()}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">{post.text}</p>

            <div className="flex items-center justify-around text-gray-600 text-sm border-t pt-2">
              <button className="flex items-center gap-1" onClick={() => handleLike(post.id)}>
                <FaThumbsUp />
                {post.likes}
              </button>
              <button className="flex items-center gap-1">
                <FaRegCommentDots />
              </button>
              <button className="flex items-center gap-1">
                <FaShare />
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <NavLink to="/" className="flex flex-col items-center text-orange-500">
            <span className="material-icons">home</span>
            <span className="text-[11px]">Home</span>
          </NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center">
            <span className="material-icons">assignment</span>
            <span className="text-[11px]">My Courses</span>
          </NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center">
            <span className="material-icons">calendar_today</span>
            <span className="text-[11px]">Calendar</span>
          </NavLink>
          <NavLink to="/handbook" className="flex flex-col items-center">
            <span className="material-icons">menu_book</span>
            <span className="text-[11px]">Handbook</span>
          </NavLink>
          <NavLink to="/menu" className="flex flex-col items-center">
            <span className="material-icons">menu</span>
            <span className="text-[11px]">Menu</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Home;

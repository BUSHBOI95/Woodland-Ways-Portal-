import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, Assignment, CalendarMonth, MenuBook, Menu } from '@mui/icons-material';
import { FaRegThumbsUp, FaRegCommentDots, FaRegPaperPlane } from 'react-icons/fa';
import moment from 'moment';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('ww_posts') || '[]');
    setPosts(storedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem('ww_posts', JSON.stringify(posts));
  }, [posts]);

  const handlePostSubmit = () => {
    if (postText.trim() === '') return;
    const newPost = {
      id: Date.now(),
      text: postText,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setPostText('');
  };

  const toggleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    );
    setPosts(updatedPosts);
  };

  const addComment = (id, comment) => {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? { ...post, comments: [...post.comments, comment] }
        : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white relative">
        <h1 className="text-lg font-semibold text-center text-white text-xl">Staff Portal</h1>
      </header>

      {/* Main Feed */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-4">
        {/* Post Box */}
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm mt-4">
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="What's on your mind?"
            rows={3}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button
            onClick={handlePostSubmit}
            className="mt-2 bg-orange-500 text-white text-sm px-4 py-2 rounded-md"
          >
            Post
          </button>
        </div>

        {/* Posts Feed */}
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <div className="flex items-center mb-2">
              <img
                src="/Icon.png"
                alt="WW"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold text-sm">Woodland Ways</p>
                <p className="text-xs text-gray-500">{moment(post.timestamp).fromNow()}</p>
              </div>
            </div>
            <p className="text-sm text-gray-800 mb-2 whitespace-pre-line">{post.text}</p>

            {/* Action Bar */}
            <div className="flex items-center justify-around border-t pt-2 text-gray-600 text-sm">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center space-x-1"
              >
                <FaRegThumbsUp className="text-md" />
                <span>{post.likes}</span>
              </button>
              <button
                onClick={() => {
                  const comment = prompt("Write a comment:");
                  if (comment) addComment(post.id, comment);
                }}
                className="flex items-center space-x-1"
              >
                <FaRegCommentDots className="text-md" />
                <span>{post.comments.length}</span>
              </button>
              <button className="flex items-center space-x-1">
                <FaRegPaperPlane className="text-md" />
              </button>
            </div>

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="mt-2 space-y-1">
                {post.comments.map((c, i) => (
                  <p key={i} className="text-xs text-gray-700 bg-white p-2 rounded-md">{c}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-10">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <NavLink to="/" className="flex flex-col items-center text-orange-500">
            <HomeIcon fontSize="medium" />
            <span className="text-[11px]">Home</span>
          </NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center">
            <Assignment fontSize="medium" />
            <span className="text-[11px]">My Courses</span>
          </NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center">
            <CalendarMonth fontSize="medium" />
            <span className="text-[11px]">Calendar</span>
          </NavLink>
          <NavLink to="/handbook" className="flex flex-col items-center">
            <MenuBook fontSize="medium" />
            <span className="text-[11px]">Handbook</span>
          </NavLink>
          <NavLink to="/menu" className="flex flex-col items-center">
            <Menu fontSize="medium" />
            <span className="text-[11px]">Menu</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Home;

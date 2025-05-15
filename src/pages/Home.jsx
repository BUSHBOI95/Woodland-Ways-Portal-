// File: src/pages/Home.jsx

import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaThumbsUp, FaComment, FaPaperPlane } from 'react-icons/fa';
import logo from '../../Icon.png'; // adjust if your file lives elsewhere

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const feedEndRef = useRef(null);

  // load saved posts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(saved);
  }, []);

  // save on change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // scroll to newest
  const scrollToBottom = () =>
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  // handle new post
  const handlePost = () => {
    if (!postText.trim()) return;
    const now = new Date();
    const newPost = {
      id: now.getTime(),
      text: postText.trim(),
      timestamp: now.toLocaleString(),
      liked: false,
      comments: [],
      showCommentInput: false,
    };
    setPosts([newPost, ...posts]);
    setPostText('');
    setTimeout(scrollToBottom, 100);
  };

  // toggle like
  const toggleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  // toggle comment box
  const toggleComment = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, showCommentInput: !p.showCommentInput } : p));
  };

  // add a comment
  const addComment = (id, commentText) => {
    if (!commentText.trim()) return;
    setPosts(posts.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        comments: [...p.comments, { id: Date.now(), text: commentText.trim(), timestamp: new Date().toLocaleTimeString() }],
        showCommentInput: false
      };
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-orange-500 text-white flex items-center justify-center py-4">
        <h1 className="text-xl font-semibold">Staff Portal</h1>
      </header>

      {/* Logo */}
      <div className="flex justify-center my-4">
        <img src={logo} alt="Woodland Ways" className="h-20 object-contain" />
      </div>

      {/* New Post */}
      <div className="px-4 mb-4">
        <textarea
          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring"
          rows={2}
          placeholder="Share an update..."
          value={postText}
          onChange={e => setPostText(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            className="bg-orange-500 text-white px-5 py-2 rounded-full"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-gray-100 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <img src={logo} alt="avatar" className="w-8 h-8 rounded-full mr-2 object-cover" />
              <div>
                <p className="font-semibold text-gray-800">Woodland Ways</p>
                <p className="text-xs text-gray-600">{post.timestamp}</p>
              </div>
            </div>

            <p className="text-gray-800 mb-3">{post.text}</p>

            {/* Actions */}
            <div className="flex items-center space-x-6 text-gray-600">
              <button
                className={`flex items-center space-x-1 ${post.liked ? 'text-blue-600' : ''}`}
                onClick={() => toggleLike(post.id)}
              >
                <FaThumbsUp />
                <span>Like</span>
              </button>

              <button
                className="flex items-center space-x-1"
                onClick={() => toggleComment(post.id)}
              >
                <FaComment />
                <span>Comment</span>
              </button>

              <button className="flex items-center space-x-1">
                <FaPaperPlane />
                <span>Send</span>
              </button>
            </div>

            {/* Comment Input */}
            {post.showCommentInput && (
              <CommentBox
                onSubmit={text => addComment(post.id, text)}
                onCancel={() => toggleComment(post.id)}
              />
            )}

            {/* Existing Comments */}
            {post.comments.map(c => (
              <div key={c.id} className="mt-3 ml-10 bg-white p-2 rounded-lg">
                <p className="text-sm text-gray-700">{c.text}</p>
                <p className="text-xs text-gray-500 mt-1">{c.timestamp}</p>
              </div>
            ))}
          </div>
        ))}
        <div ref={feedEndRef} />
      </div>

      {/* Bottom Nav */}
      <footer className="fixed bottom-0 w-full bg-white border-t">
        <nav className="flex justify-around py-2 text-gray-700">
          <NavLink to="/" className="flex flex-col items-center text-orange-500">
            <FaPaperPlane />
            <span className="text-[10px]">Home</span>
          </NavLink>
          {/* ...other tabs untouched */}
        </nav>
      </footer>
    </div>
  );
};

// Inline component for the comment box
const CommentBox = ({ onSubmit, onCancel }) => {
  const [text, setText] = useState('');
  return (
    <div className="mt-3 ml-10">
      <textarea
        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none"
        rows={2}
        placeholder="Write a comment..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="flex justify-end mt-1 space-x-2">
        <button
          className="text-gray-600 px-3 py-1"
          onClick={() => { setText(''); onCancel(); }}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded-full"
          onClick={() => { onSubmit(text); setText(''); }}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default Home;

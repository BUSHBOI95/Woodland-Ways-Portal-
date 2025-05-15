import React, { useState, useEffect } from 'react';
import Logo from '../Icon.png';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('feedPosts')) || [];
    setPosts(storedPosts);
  }, []);

  const handlePost = () => {
    if (!newPost.trim()) return;
    const updatedPosts = [
      {
        id: Date.now(),
        name: 'Jon Magellan',
        badge: 'All-star contributor',
        message: newPost,
        time: 'just now',
      },
      ...posts,
    ];
    setPosts(updatedPosts);
    localStorage.setItem('feedPosts', JSON.stringify(updatedPosts));
    setNewPost('');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col justify-between">
      {/* HEADER */}
      <header className="flex justify-center px-4 py-4 bg-orange-500 text-white">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      <main className="flex-1 px-4 py-6 overflow-y-auto">
        {/* Main Logo */}
        <img src={Logo} alt="Woodland Ways Logo" className="h-32 mx-auto mt-4 mb-6" />

        {/* Post Input */}
        <div className="bg-gray-100 p-4 rounded-xl shadow-sm mb-4">
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
            rows="2"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              onClick={handlePost}
              className="bg-orange-500 text-white text-sm mt-2 px-4 py-2 rounded-full"
            >
              Post
            </button>
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="flex justify-between gap-2 mb-6">
          <button className="bg-orange-400 text-white w-full py-2 rounded-full text-sm font-medium">
            Photos
          </button>
          <button className="bg-orange-400 text-white w-full py-2 rounded-full text-sm font-medium">
            Events
          </button>
          <button className="bg-orange-400 text-white w-full py-2 rounded-full text-sm font-medium">
            Directory
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <img src={Logo} alt="Avatar" className="h-6 w-6 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">{post.name}</p>
                  <p className="text-xs text-gray-500">{post.badge} · {post.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mt-1">{post.message}</p>
              <div className="flex justify-start gap-6 text-gray-600 text-sm mt-3">
                <button className="flex items-center gap-1">
                  <i className="fas fa-thumbs-up"></i> Like
                </button>
                <button className="flex items-center gap-1">
                  <i className="fas fa-comment"></i> Comment
                </button>
                <button className="flex items-center gap-1">
                  <i className="fas fa-paper-plane"></i> Send
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* NAVIGATION BAR */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <a href="/" className="flex flex-col items-center text-orange-500">
            <i className="fas fa-home text-lg"></i>
            <span className="text-[11px]">Home</span>
          </a>
          <a href="/my-courses" className="flex flex-col items-center">
            <i className="fas fa-clipboard-list text-lg"></i>
            <span className="text-[11px]">My Courses</span>
          </a>
          <a href="/calendar" className="flex flex-col items-center">
            <i className="fas fa-calendar-alt text-lg"></i>
            <span className="text-[11px]">Calendar</span>
          </a>
          <a href="/handbook" className="flex flex-col items-center">
            <i className="fas fa-book text-lg"></i>
            <span className="text-[11px]">Handbook</span>
          </a>
          <a href="/menu" className="flex flex-col items-center">
            <i className="fas fa-bars text-lg"></i>
            <span className="text-[11px]">Menu</span>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Home;

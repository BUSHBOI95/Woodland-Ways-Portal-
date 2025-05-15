import React, { useState, useEffect } from 'react';
import { ThumbUp, ChatBubbleOutline, Send } from '@mui/icons-material';

// Logo is stored in the public folder, so we reference it from the root
const Logo = '/Icon.png';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('staffFeed') || '[]');
    setPosts(storedPosts);
  }, []);

  const handlePost = () => {
    if (!newPost.trim()) return;
    const updatedPosts = [
      {
        id: Date.now(),
        author: 'Jon Magellan',
        role: 'All-star contributor',
        avatar: Logo,
        content: newPost,
        timestamp: 'Just now',
      },
      ...posts,
    ];
    localStorage.setItem('staffFeed', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setNewPost('');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-4">
        {/* Main Logo */}
        <div className="flex justify-center mt-4">
          <img src={Logo} alt="Woodland Ways Logo" className="w-32 h-auto" />
        </div>

        {/* Post Input */}
        <div className="bg-gray-50 rounded-xl p-3 shadow-sm">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <div className="flex justify-between mt-3">
            <div className="flex gap-2">
              <button className="bg-orange-400 text-white px-4 py-1 rounded-full text-sm">Photos</button>
              <button className="bg-orange-400 text-white px-4 py-1 rounded-full text-sm">Events</button>
              <button className="bg-orange-400 text-white px-4 py-1 rounded-full text-sm">Directory</button>
            </div>
            <button
              onClick={handlePost}
              className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm"
            >
              Post
            </button>
          </div>
        </div>

        {/* Feed Posts */}
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <img src={post.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-semibold">{post.author}</p>
                <p className="text-[11px] text-gray-600">{post.role} · {post.timestamp}</p>
              </div>
            </div>
            <p className="text-sm text-gray-800 mt-2">{post.content}</p>
            <div className="flex justify-around text-gray-600 text-sm border-t pt-2 mt-2">
              <div className="flex items-center gap-1 cursor-pointer">
                <ThumbUp fontSize="small" /> Like
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <ChatBubbleOutline fontSize="small" /> Comment
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <Send fontSize="small" /> Send
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
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

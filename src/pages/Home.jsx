import React, { useState, useEffect } from 'react';
import { ThumbUp, ChatBubbleOutline } from '@mui/icons-material';

const logoUrl = '/icon.png'; // Woodland Ways logo in public folder
const avatar = 'https://i.pravatar.cc/48?u=staff'; // placeholder avatar

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ww_posts') || '[]');
    setPosts(saved);
  }, []);

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      name: "Jon Magellan",
      badge: "Top Contributor",
      message: newPost,
      timestamp: new Date().toISOString()
    };
    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem('ww_posts', JSON.stringify(updated));
    setNewPost('');
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    const hr = Math.floor(diff / 60);
    if (hr < 24) return `${hr}h ago`;
    return `${Math.floor(hr / 24)}d ago`;
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20 flex flex-col justify-between">
      <header className="flex items-center justify-center py-3 bg-orange-500">
        <img src={logoUrl} alt="WW" className="h-8" />
      </header>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="bg-gray-100 p-3 rounded-xl shadow mb-4 mt-3">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full text-sm p-2 rounded border border-gray-300"
            rows="2"
          />
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white text-sm px-4 py-2 rounded-full mt-2 float-right"
          >
            Post
          </button>
        </div>

        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-100 p-3 rounded-xl shadow-sm">
              <div className="flex items-center mb-1">
                <img src={avatar} className="w-8 h-8 rounded-full mr-2" alt="avatar" />
                <div>
                  <p className="font-semibold text-sm">{post.name}</p>
                  <p className="text-xs text-gray-500">{post.badge} â¢ {formatTimeAgo(post.timestamp)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{post.message}</p>
              <div className="flex text-xs text-gray-600 gap-6">
                <div className="flex items-center space-x-1">
                  <ThumbUp fontSize="small" /> <span>Like</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ChatBubbleOutline fontSize="small" /> <span>Comment</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import logo from '../../Icon.png';
import { FaThumbsUp, FaRegComment, FaPaperPlane } from 'react-icons/fa';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('posts');
    return saved ? JSON.parse(saved) : [];
  });

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        text: postText.trim(),
        timestamp: new Date().toISOString(),
      };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setPostText('');
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="bg-orange-500 text-white text-xl font-bold p-4 text-center">Staff Portal</div>
      <div className="flex flex-col items-center py-6">
        <img src={logo} alt="Woodland Ways Logo" className="w-28 h-28 object-contain mb-2" />
        <h1 className="text-2xl font-semibold mb-4">Woodland Ways</h1>

        <div className="w-11/12 max-w-xl bg-gray-100 p-4 rounded-xl shadow-md mb-6">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handlePost}
              className="bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600"
            >
              Post
            </button>
          </div>
        </div>

        <div className="w-11/12 max-w-xl space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <img src={logo} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-bold">Woodland Ways</p>
                  <p className="text-xs text-gray-500">{formatDate(post.timestamp)}</p>
                </div>
              </div>
              <p className="mb-3 text-gray-800">{post.text}</p>
              <div className="flex justify-around text-gray-600 text-sm">
                <button className="flex items-center space-x-1 hover:text-orange-500">
                  <FaThumbsUp /> <span>Like</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-orange-500">
                  <FaRegComment /> <span>Comment</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-orange-500">
                  <FaPaperPlane /> <span>Send</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

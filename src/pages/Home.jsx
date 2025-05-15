import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaRegCommentDots, FaPaperPlane } from 'react-icons/fa';
import { MdHome, MdAssignment, MdCalendarToday, MdMenuBook, MdMenu } from 'react-icons/md';
import Icon from '../../Icon.png';
import moment from 'moment';
import Logo from '../../Icon.png';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem('posts');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        text: postText,
        timestamp: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
      setPostText('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <header className="bg-orange-500 text-white text-center py-4 text-xl font-bold">
        Staff Portal
      </header>

      <main className="flex-grow p-4">
        <div className="flex justify-center mb-4">
          <img
            src={Logo}
            alt="Woodland Ways Logo"
            className="w-32 h-auto"
          />
        </div>
        <h1 className="text-xl text-center font-semibold mb-4">Woodland Ways</h1>

        <div className="bg-gray-100 rounded-xl p-4 shadow mb-6">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-2 rounded border border-gray-300 mb-2 resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handlePost}
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
            >
              Post
            </button>
          </div>
        </div>

        {posts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center mb-2">
              <img
                src={Icon}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-bold">Woodland Ways</p>
                <p className="text-sm text-gray-500">{moment(post.timestamp).format('DD/MM/YYYY, HH:mm:ss')}</p>
              </div>
            </div>
            <p className="mb-3">{post.text}</p>
            <div className="flex justify-between text-gray-600 text-sm">
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <FaThumbsUp />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <FaRegCommentDots />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <FaPaperPlane />
                <span>Send</span>
              </button>
            </div>
          </div>
        ))}
      </main>

      <footer className="bg-white border-t shadow-inner">
        <nav className="flex justify-around text-xs text-gray-700 py-2">
          <div className="flex flex-col items-center text-orange-500">
            <MdHome size={24} />
            <span className="text-[10px]">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <MdAssignment size={24} />
            <span className="text-[10px]">My Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <MdCalendarToday size={24} />
            <span className="text-[10px]">Calendar</span>
          </div>
          <div className="flex flex-col items-center">
            <MdMenuBook size={24} />
            <span className="text-[10px]">Handbook</span>
          </div>
          <div className="flex flex-col items-center">
            <MdMenu size={24} />
            <span className="text-[10px]">Menu</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Home;

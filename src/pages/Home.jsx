import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MdThumbUp, MdComment, MdSend } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Logo from '../../Icon.png';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [likes, setLikes] = useState({});

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        author: 'Woodland Ways',
        timestamp: new Date(),
        content: postText,
      };
      setPosts([newPost, ...posts]);
      setPostText('');
    }
  };

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-orange-500 text-white text-center py-4 text-xl font-bold">
        Staff Portal
      </header>

      {/* Logo */}
      <div className="flex flex-col items-center my-4">
        <img src={Logo} alt="Logo" className="w-24 h-24 object-contain mb-2" />
        <h1 className="text-xl font-semibold">Woodland Ways</h1>
      </div>

      {/* Post Input */}
      <div className="px-4 mb-4">
        <div className="bg-gray-100 p-4 rounded-xl">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full resize-none p-2 rounded border border-gray-300"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handlePost}
              className="bg-orange-500 text-white px-4 py-2 rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="px-4 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow p-4 border">
            <div className="flex items-center mb-2">
              <img src={Logo} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
              <div>
                <p className="font-bold">Woodland Ways</p>
                <p className="text-xs text-gray-500">{moment(post.timestamp).fromNow()}</p>
              </div>
            </div>
            <p className="mb-2">{post.content}</p>
            <div className="flex justify-around text-gray-500 text-sm border-t pt-2">
              <button
                className={`flex items-center space-x-1 ${likes[post.id] ? 'text-orange-500' : ''}`}
                onClick={() => toggleLike(post.id)}
              >
                <MdThumbUp />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1">
                <MdComment />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1">
                <MdSend />
                <span>Send</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nav Bar */}
      <nav className="mt-auto fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner flex justify-around text-xs text-gray-700">
        <NavLink
          to="/home"
          className="flex flex-col items-center py-2"
        >
          <MdThumbUp size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/my-courses" className="flex flex-col items-center py-2">
          <span className="material-icons">assignment</span>
          <span>My Courses</span>
        </NavLink>
        <NavLink to="/calendar" className="flex flex-col items-center py-2">
          <span className="material-icons">calendar_today</span>
          <span>Calendar</span>
        </NavLink>
        <NavLink to="/handbook" className="flex flex-col items-center py-2">
          <span className="material-icons">menu_book</span>
          <span>Handbook</span>
        </NavLink>
        <NavLink to="/menu" className="flex flex-col items-center py-2">
          <span className="material-icons">menu</span>
          <span>Menu</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Home;

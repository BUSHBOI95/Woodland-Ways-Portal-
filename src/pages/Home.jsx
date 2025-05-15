import React, { useState, useEffect } from 'react';
import Logo from '../../Icon.png';
import { FaThumbsUp, FaRegComment, FaShare } from 'react-icons/fa';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('posts');
    return saved ? JSON.parse(saved) : [];
  });
  const [likes, setLikes] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        name: 'Woodland Ways',
        avatar: '../../Icon.png',
        time: new Date().toISOString(),
        content: postText,
        likes: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setPostText('');
    }
  };

  const toggleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likes[postId] ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const timeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString('en-GB') + ', ' + new Date(timestamp).toLocaleTimeString('en-GB');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      <div className="bg-orange-500 w-full text-center py-4 text-white text-xl font-bold">
        Staff Portal
      </div>

      <div className="my-4">
        <img src={Logo} alt="Logo" className="w-24 h-24 mx-auto" />
        <h1 className="text-2xl font-semibold text-center">Woodland Ways</h1>
      </div>

      <div className="w-11/12 max-w-md bg-gray-100 p-4 rounded-xl">
        <textarea
          className="w-full p-2 rounded-md border resize-none"
          rows="2"
          placeholder="Share an update..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white px-4 py-1 rounded-full"
          >
            Post
          </button>
        </div>
      </div>

      <div className="w-11/12 max-w-md mt-4 space-y-4 mb-24">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md p-4 rounded-xl border"
          >
            <div className="flex items-center mb-2">
              <img
                src={Logo}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-2 border"
              />
              <div>
                <p className="font-bold text-sm">{post.name}</p>
                <p className="text-xs text-gray-500">{timeAgo(post.time)}</p>
              </div>
            </div>
            <p className="mb-3 text-sm">{post.content}</p>
            <div className="flex justify-around text-sm text-gray-600">
              <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1">
                <FaThumbsUp className={likes[post.id] ? 'text-orange-500' : ''} />
                Like {post.likes > 0 && `(${post.likes})`}
              </button>
              <button onClick={() => toggleComments(post.id)} className="flex items-center gap-1">
                <FaRegComment />
                Comment
              </button>
              <button className="flex items-center gap-1">
                <FaShare />
                Send
              </button>
            </div>
            {showComments[post.id] && (
              <div className="mt-2">
                <input
                  className="w-full border rounded p-1 text-sm"
                  placeholder="Write a comment..."
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile nav bar */}
      <div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2">
        <div className="flex flex-col items-center text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a1 1 0 01.707.293l7 7a1 1 0 11-1.414 1.414L17 10.414V17a1 1 0 01-1 1h-4v-4H8v4H4a1 1 0 01-1-1v-6.586l-.293.293a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 2z" />
          </svg>
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-xs">My Courses</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-xs">Calendar</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-xs">Handbook</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-xs">Menu</span>
        </div>
      </div>
    </div>
  );
};

export default Home;

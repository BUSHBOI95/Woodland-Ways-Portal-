import React, { useState, useEffect } from "react";
import moment from "moment";
import { FaThumbsUp, FaCommentAlt, FaPaperPlane } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim() !== "") {
      const newPost = {
        id: Date.now(),
        author: "Woodland Ways",
        content: postText,
        timestamp: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
      setPostText("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-orange-500 text-white text-center py-4 font-bold text-xl">
        Staff Portal
      </header>

      <main className="flex-grow p-4">
        <div className="flex flex-col items-center mb-6">
          <img src="/Icon.png" alt="Woodland Ways Logo" className="w-24 h-24 mb-2" />
          <h1 className="text-xl font-bold">Woodland Ways</h1>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded resize-none"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button
            className="mt-2 bg-orange-500 text-white px-4 py-2 rounded float-right"
            onClick={handlePost}
          >
            Post
          </button>
        </div>

        <div>
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow mb-4">
              <div className="flex items-center mb-2">
                <img src="/Icon.png" alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-bold text-sm">Woodland Ways</p>
                  <p className="text-xs text-gray-500">
                    {moment(post.timestamp).format("DD/MM/YYYY, HH:mm:ss")}
                  </p>
                </div>
              </div>
              <p className="mb-3">{post.content}</p>
              <div className="flex justify-between text-gray-600 text-sm px-6">
                <button className="flex items-center gap-2">
                  <FaThumbsUp /> Like
                </button>
                <button className="flex items-center gap-2">
                  <FaCommentAlt /> Comment
                </button>
                <button className="flex items-center gap-2">
                  <FaPaperPlane /> Send
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t p-2 fixed bottom-0 left-0 w-full flex justify-around text-xs text-gray-700">
        <NavLink to="/" className="flex flex-col items-center text-orange-500">
          <span className="material-icons">home</span>
          Home
        </NavLink>
        <NavLink to="/courses" className="flex flex-col items-center">
          <span className="material-icons">assignment</span>
          My Courses
        </NavLink>
        <NavLink to="/calendar" className="flex flex-col items-center">
          <span className="material-icons">calendar_today</span>
          Calendar
        </NavLink>
        <NavLink to="/handbook" className="flex flex-col items-center">
          <span className="material-icons">menu_book</span>
          Handbook
        </NavLink>
        <NavLink to="/menu" className="flex flex-col items-center">
          <span className="material-icons">menu</span>
          Menu
        </NavLink>
      </footer>
    </div>
  );
};

export default Home;

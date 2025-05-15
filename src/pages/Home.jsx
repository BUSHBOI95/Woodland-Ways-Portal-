import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaRegComment, FaPaperPlane } from "react-icons/fa";
import moment from "moment";
import WWLogo from "../../Icon.png";
import { NavLink } from "react-router-dom";
import { MdHome, MdAssignment, MdCalendarToday, MdMenuBook, MdMenu } from "react-icons/md";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  const handlePost = () => {
    if (postText.trim() !== "") {
      const newPost = {
        text: postText,
        timestamp: new Date().toISOString(),
        user: {
          name: "Woodland Ways",
          avatar: WWLogo,
        },
        likes: 0,
        liked: false,
      };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setPostText("");
    }
  };

  const toggleLike = (index) => {
    const updatedPosts = [...posts];
    const post = updatedPosts[index];
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-orange-500 text-white py-4 text-center text-xl font-bold shadow-md">
        Staff Portal
      </header>

      <div className="flex flex-col items-center mt-4 px-4">
        <img src={WWLogo} alt="Logo" className="w-24 h-24 object-contain mb-1" />
        <h2 className="text-lg font-semibold mb-4">Woodland Ways</h2>

        <div className="bg-gray-100 rounded-lg p-4 w-full max-w-md shadow">
          <textarea
            placeholder="Share an update..."
            className="w-full p-2 rounded border border-gray-300 resize-none focus:outline-none focus:ring focus:ring-orange-300"
            rows="2"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handlePost}
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
            >
              Post
            </button>
          </div>
        </div>

        <div className="mt-6 w-full max-w-md space-y-4 pb-20">
          {posts.map((post, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow">
              <div className="flex items-center mb-2">
                <img
                  src={post.user.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-sm">{post.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {moment(post.timestamp).fromNow()}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 text-sm">{post.text}</p>
              <div className="flex justify-around text-gray-600 mt-3 text-sm">
                <button
                  className={`flex items-center space-x-1 ${post.liked ? "text-blue-600" : ""}`}
                  onClick={() => toggleLike(index)}
                >
                  <FaThumbsUp />
                  <span>Like {post.likes > 0 && `(${post.likes})`}</span>
                </button>
                <button className="flex items-center space-x-1">
                  <FaRegComment />
                  <span>Comment</span>
                </button>
                <button className="flex items-center space-x-1">
                  <FaPaperPlane />
                  <span>Send</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner flex justify-around items-center h-14 text-xs text-gray-700">
        <NavLink to="/" className="flex flex-col items-center" activeclassname="text-orange-500">
          <MdHome className="text-xl" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/my-courses" className="flex flex-col items-center">
          <MdAssignment className="text-xl" />
          <span>My Courses</span>
        </NavLink>
        <NavLink to="/calendar" className="flex flex-col items-center">
          <MdCalendarToday className="text-xl" />
          <span>Calendar</span>
        </NavLink>
        <NavLink to="/handbook" className="flex flex-col items-center">
          <MdMenuBook className="text-xl" />
          <span>Handbook</span>
        </NavLink>
        <NavLink to="/menu" className="flex flex-col items-center">
          <MdMenu className="text-xl" />
          <span>Menu</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Home;

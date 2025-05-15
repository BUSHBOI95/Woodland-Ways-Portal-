import React, { useState, useEffect } from "react";
import moment from "moment";
import Logo from "../../Icon.png";

const Home = () => {
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  });

  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (newPost.trim() === "") return;
    const post = {
      id: Date.now(),
      content: newPost,
      timestamp: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-orange-500 text-white text-center py-4 text-xl font-bold">
        Staff Portal
      </div>

      <div className="flex justify-center mt-4">
        <img src={Logo} alt="Woodland Ways Logo" className="w-32 h-auto" />
      </div>
      <h1 className="text-xl font-bold text-center mt-2 mb-4">Woodland Ways</h1>

      <div className="max-w-md mx-auto bg-gray-100 rounded-lg p-4 shadow">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 rounded border border-gray-300"
        />
        <div className="text-right mt-2">
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
          >
            Post
          </button>
        </div>
      </div>

      <div className="flex justify-around text-sm text-gray-600 mt-4 max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <span className="material-icons">photo</span>
          Photos
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons">event</span>
          Events
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons">groups</span>
          Directory
        </div>
      </div>

      <div className="max-w-md mx-auto mt-4 space-y-4 px-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow p-4 rounded">
            <div className="flex items-center mb-2">
              <img src={Logo} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
              <div>
                <div className="font-bold">Woodland Ways</div>
                <div className="text-xs text-gray-500">
                  Instructor • {moment(post.timestamp).fromNow()}
                </div>
              </div>
            </div>
            <div className="text-gray-800">{post.content}</div>
            <div className="flex justify-around text-gray-500 text-sm mt-3">
              <button className="flex items-center space-x-1">
                <span className="material-icons text-base">thumb_up</span>
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1">
                <span className="material-icons text-base">chat_bubble_outline</span>
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1">
                <span className="material-icons text-base">send</span>
                <span>Send</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

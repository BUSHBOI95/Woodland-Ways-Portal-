import React, { useState, useEffect } from "react";
import Icon from "../../Icon.png";
import { NavLink } from "react-router-dom";
import {
  Home as HomeIcon,
  Assignment,
  CalendarMonth,
  MenuBook,
  Menu,
  Photo,
  Event,
  Group,
  Send,
  ThumbUp,
  ChatBubble,
} from "@mui/icons-material";
import moment from "moment";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    const savedComments = localStorage.getItem("comments");
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedComments) setComments(JSON.parse(savedComments));
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [posts, comments]);

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        text: postText,
        timestamp: moment().fromNow(),
      };
      setPosts([newPost, ...posts]);
      setPostText("");
    }
  };

  const handleCommentChange = (postId, text) => {
    setCommentInputs({ ...commentInputs, [postId]: text });
  };

  const handleCommentSubmit = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (text) {
      const newComment = {
        id: Date.now(),
        text,
        timestamp: moment().fromNow(),
        author: "Woodland Ways",
      };
      const updated = {
        ...comments,
        [postId]: comments[postId] ? [...comments[postId], newComment] : [newComment],
      };
      setComments(updated);
      setCommentInputs({ ...commentInputs, [postId]: "" });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      <header className="bg-orange-500 text-white px-4 py-3 flex justify-center items-center">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="flex justify-center py-3">
          <img src={Icon} alt="Woodland Ways Logo" className="h-24 w-auto object-contain" />
        </div>

        <div className="bg-gray-100 rounded-xl p-3 mb-4">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none"
            rows={3}
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white px-4 py-2 mt-2 rounded-full text-sm float-right"
          >
            Post
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
          <div className="flex flex-col items-center"><Photo fontSize="small" /><span>Photos</span></div>
          <div className="flex flex-col items-center"><Event fontSize="small" /><span>Events</span></div>
          <div className="flex flex-col items-center"><Group fontSize="small" /><span>Directory</span></div>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border rounded-lg p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <img src={Icon} alt="Avatar" className="w-10 h-10 rounded-full object-cover mr-3" />
                <div>
                  <p className="font-semibold text-sm">Woodland Ways</p>
                  <p className="text-xs text-gray-500">Instructor • {post.timestamp}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{post.text}</p>
              <div className="flex justify-around text-gray-500 text-xs border-t pt-2">
                <div className="flex items-center gap-1"><ThumbUp fontSize="small" /><span>Like</span></div>
                <div className="flex items-center gap-1"><ChatBubble fontSize="small" /><span>Comment</span></div>
                <div className="flex items-center gap-1"><Send fontSize="small" /><span>Send</span></div>
              </div>

              {/* Comment Box */}
              <div className="mt-2 flex items-center border-t pt-2">
                <input
                  className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm"
                  placeholder="Write a comment..."
                  value={commentInputs[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
                <button onClick={() => handleCommentSubmit(post.id)}>
                  <Send className="text-orange-500 ml-2" fontSize="small" />
                </button>
              </div>

              {/* Render comments */}
              <div className="mt-2 space-y-2 text-sm">
                {comments[post.id]?.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2">
                    <img src={Icon} alt="Avatar" className="w-8 h-8 rounded-full object-cover mt-1" />
                    <div>
                      <p className="font-semibold text-sm">Woodland Ways</p>
                      <p className="text-xs text-gray-400">{comment.timestamp}</p>
                      <p className="text-gray-800">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <NavLink to="/" className="flex flex-col items-center text-orange-500"><HomeIcon fontSize="medium" /><span className="text-[11px]">Home</span></NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center"><Assignment fontSize="medium" /><span className="text-[11px]">My Courses</span></NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center"><CalendarMonth fontSize="medium" /><span className="text-[11px]">Calendar</span></NavLink>
          <NavLink to="/handbook" className="flex flex-col items-center"><MenuBook fontSize="medium" /><span className="text-[11px]">Handbook</span></NavLink>
          <NavLink to="/menu" className="flex flex-col items-center"><Menu fontSize="medium" /><span className="text-[11px]">Menu</span></NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Home;

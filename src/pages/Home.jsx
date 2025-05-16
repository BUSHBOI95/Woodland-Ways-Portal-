import React, { useState } from "react";
import moment from "moment";
import { FaThumbsUp, FaRegCommentDots, FaPaperPlane } from "react-icons/fa";

import logo from "../../Icon.png";
import avatar from "../../avatar.png";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [likes, setLikes] = useState({});
  const [commentLikes, setCommentLikes] = useState({});
  const [replies, setReplies] = useState({});

  const handlePostSubmit = () => {
    if (postText.trim() === "") return;
    const newPost = {
      id: Date.now(),
      text: postText,
      timestamp: new Date(),
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleCommentSubmit = (postId) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;
    const newComment = {
      id: Date.now(),
      text: comment,
      timestamp: new Date(),
    };
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const toggleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1,
    }));
  };

  const toggleCommentLike = (commentId) => {
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-20">
      <div className="bg-orange-500 text-white text-xl font-bold py-3 text-center">
        Staff Portal
      </div>

      <div className="flex justify-center mt-4">
        <img src={logo} alt="Woodland Ways Logo" className="h-24" />
      </div>

      <div className="flex flex-col items-center my-4">
        <textarea
          className="w-11/12 border rounded-md p-3 text-sm"
          rows={3}
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <button
          onClick={handlePostSubmit}
          className="mt-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-full"
        >
          Post
        </button>
      </div>

      <div className="flex justify-around py-2 text-sm text-gray-600 border-y">
        <div className="flex flex-col items-center">
          <img src="/photos.png" alt="Photos" className="h-6 mb-1" />
          <span>Photos</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/events.png" alt="Events" className="h-6 mb-1" />
          <span>Events</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/directory.png" alt="Directory" className="h-6 mb-1" />
          <span>Directory</span>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <img src={avatar} alt="avatar" className="h-10 w-10 rounded-full" />
              <div>
                <p className="font-semibold text-sm">Woodland Ways</p>
                <p className="text-xs text-gray-500">
                  Instructor • {moment(post.timestamp).fromNow()}
                </p>
              </div>
            </div>
            <p className="text-gray-800 mb-3">{post.text}</p>
            <div className="flex items-center gap-6 mb-2 text-gray-600 text-sm">
              <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1">
                <FaThumbsUp /> Like ({likes[post.id] || 0})
              </button>
              <div className="flex items-center gap-1">
                <FaRegCommentDots /> Comment
              </div>
              <div className="flex items-center gap-1">
                <FaPaperPlane /> Send
              </div>
            </div>
            <div className="relative">
              <input
                value={commentInputs[post.id] || ""}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                placeholder="Write a comment..."
                className="w-full border rounded-full px-4 py-2 pr-10 text-sm"
              />
              <button
                onClick={() => handleCommentSubmit(post.id)}
                className="absolute right-3 top-2 text-orange-500"
              >
                <FaPaperPlane />
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-100 rounded-xl p-3 ml-10 text-sm"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="font-semibold text-xs">Instructor</span>
                    <span className="text-xs text-gray-500">
                      {moment(comment.timestamp).fromNow()}
                    </span>
                  </div>
                  <p>{comment.text}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 ml-8">
                    <button onClick={() => toggleCommentLike(comment.id)}>
                      Like ({commentLikes[comment.id] || 0})
                    </button>
                    <button>Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { ThumbUp, ChatBubbleOutline, Send, Image, Event, Group, Home, School, CalendarMonth, MenuBook, Menu } from "@mui/icons-material";
import moment from "moment";
import WWLogo from "../../Icon.png";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [likes, setLikes] = useState({});
  const [commentLikes, setCommentLikes] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      author: "Woodland Ways",
      role: "Instructor",
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: [],
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleComment = (postId) => {
    const content = newComment[postId];
    if (!content?.trim()) return;

    const comment = {
      id: Date.now(),
      author: "Woodland Ways",
      role: "Instructor",
      content: content,
      timestamp: new Date(),
      likes: 0,
    };

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    );

    setPosts(updatedPosts);
    setNewComment({ ...newComment, [postId]: "" });
  };

  const toggleLike = (postId) => {
    setLikes((prev) => {
      const alreadyLiked = prev[postId];
      return {
        ...prev,
        [postId]: !alreadyLiked,
      };
    });
  };

  const toggleCommentLike = (postId, commentId) => {
    setCommentLikes((prev) => {
      const key = `${postId}-${commentId}`;
      const alreadyLiked = prev[key];
      return {
        ...prev,
        [key]: !alreadyLiked,
      };
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-center text-xl font-bold text-white bg-orange-600 p-3 rounded-t">Staff Portal</h1>
      <div className="flex justify-center py-2">
        <img src={WWLogo} alt="Woodland Ways" className="w-24 h-24 object-contain" />
      </div>

      <input
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded-md mb-3"
      />
      <button onClick={handlePost} className="bg-orange-500 text-white px-4 py-2 rounded float-right mb-4">
        Post
      </button>

      <div className="flex justify-around text-gray-600 mb-4">
        <div className="flex flex-col items-center text-xs">
          <Image />
          Photos
        </div>
        <div className="flex flex-col items-center text-xs">
          <Event />
          Events
        </div>
        <div className="flex flex-col items-center text-xs">
          <Group />
          Directory
        </div>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-md shadow p-3 mb-4">
          <div className="flex items-center gap-2">
            <img src={WWLogo} alt="avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-bold text-sm">{post.author}</p>
              <p className="text-xs text-gray-400">{post.role} • {moment(post.timestamp).fromNow()}</p>
            </div>
          </div>
          <p className="mt-2">{post.content}</p>

          <div className="flex items-center justify-around text-sm mt-2 text-gray-600">
            <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1">
              <ThumbUp className="text-gray-600" fontSize="small" />
              {likes[post.id] ? "Unlike" : "Like"} ({likes[post.id] ? 1 : 0})
            </button>
            <button onClick={() => setShowCommentBox({ ...showCommentBox, [post.id]: !showCommentBox[post.id] })} className="flex items-center gap-1">
              <ChatBubbleOutline className="text-gray-600" fontSize="small" />
              Comment
            </button>
            <button className="flex items-center gap-1">
              <Send className="text-gray-600" fontSize="small" />
              Send
            </button>
          </div>

          {showCommentBox[post.id] && (
            <>
              <div className="mt-2 flex items-center border rounded-md px-2">
                <img src={WWLogo} alt="avatar" className="w-6 h-6 rounded-full mr-2" />
                <input
                  type="text"
                  value={newComment[post.id] || ""}
                  onChange={(e) =>
                    setNewComment({ ...newComment, [post.id]: e.target.value })
                  }
                  placeholder="Write a comment..."
                  className="flex-1 p-1"
                />
                <button
                  onClick={() => handleComment(post.id)}
                  className="text-orange-500 font-bold text-lg ml-2"
                >
                  →
                </button>
              </div>
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 rounded-md p-2 mt-2 ml-6">
                  <div className="flex items-center gap-2">
                    <img src={WWLogo} alt="avatar" className="w-6 h-6 rounded-full" />
                    <div>
                      <p className="font-bold text-sm">{comment.author}</p>
                      <p className="text-xs text-gray-400">{moment(comment.timestamp).fromNow()}</p>
                    </div>
                  </div>
                  <p className="ml-8">{comment.content}</p>
                  <div className="flex items-center gap-4 ml-8 text-xs text-gray-500 mt-1">
                    <button onClick={() => toggleCommentLike(post.id, comment.id)}>
                      Like ({commentLikes[`${post.id}-${comment.id}`] ? 1 : 0})
                    </button>
                    <button>Reply</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ))}

      {/* NavBar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <div className="flex flex-col items-center text-xs text-orange-500">
          <Home fontSize="small" />
          Home
        </div>
        <div className="flex flex-col items-center text-xs text-gray-600">
          <School fontSize="small" />
          My Courses
        </div>
        <div className="flex flex-col items-center text-xs text-gray-600">
          <CalendarMonth fontSize="small" />
          Calendar
        </div>
        <div className="flex flex-col items-center text-xs text-gray-600">
          <MenuBook fontSize="small" />
          Handbook
        </div>
        <div className="flex flex-col items-center text-xs text-gray-600">
          <Menu fontSize="small" />
          Menu
        </div>
      </div>
    </div>
  );
}

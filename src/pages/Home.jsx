import React, { useState } from "react";
import WWLogo from "../../Icon.png";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdHome, MdAssignment, MdCalendarToday, MdMenuBook, MdMenu } from "react-icons/md";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "Woodland Ways",
      timestamp: "15/05/2025, 16:23:11",
      text: "Hello my name is Joe and I am a woodland ways apprentice!",
    },
  ]);

  const handlePost = () => {
    if (postText.trim() === "") return;
    const newPost = {
      id: posts.length + 1,
      username: "Woodland Ways",
      timestamp: moment().format("DD/MM/YYYY, HH:mm:ss"),
      text: postText,
    };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-orange-500 text-white text-center py-4 text-xl font-bold">
        Staff Portal
      </div>

      <div className="flex justify-center mt-4">
        <img src={WWLogo} alt="Logo" className="h-24 w-auto" />
      </div>
      <h2 className="text-xl font-semibold text-center mt-2 mb-4">Woodland Ways</h2>

      <div className="max-w-md mx-auto bg-gray-100

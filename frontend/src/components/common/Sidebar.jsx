import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo";
import { FaHome, FaUser, FaBell, FaBookmark } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: FaHome, label: "Home", path: "/" },
    { icon: FaUser, label: "Profile", path: "/profile" },
    { icon: FaBell, label: "Notifications", path: "/notifications" },
    { icon: FaBookmark, label: "Bookmarks", path: "/bookmarks" },
  ];

  return (
    <div className="w-[275px] h-screen p-4 flex flex-col justify-between border-r border-gray-800">
      <div className="space-y-6">
        <Link to="/" className="block w-32">
          <Logo className="w-full" />
        </Link>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-3 rounded-full hover:bg-gray-900 transition-all ${
                location.pathname === item.path ? "font-bold bg-gray-900" : ""
              }`}
            >
              <item.icon className="text-xl" />
              <span>{item.label}</span>
            </Link>
          ))}
          
          <button className="w-full mt-4 btn btn-primary rounded-full">
            Post
          </button>
        </nav>
      </div>

      <button 
        className="flex items-center gap-4 p-3 rounded-full hover:bg-gray-900 transition-all text-red-500"
        onClick={() => {/* Add logout logic */}}
      >
        <IoMdLogOut className="text-xl" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;

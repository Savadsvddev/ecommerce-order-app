import { useState, useRef, useEffect } from "react";
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (route) => {
    setOpen(false);
    navigate(route)
  }

     const OnSignOut = ()=>{
      localStorage.clear()
      navigate("/login")
    }

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden cursor-pointer"
      >
        <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-md shadow-lg bg-white border border-[hsl(0,0%,89.8%)] z-50">
          <div className="py-2">
            {/* 🔰 Heading */}
            <div className="px-4 py-2 text-sm font-bold text-gray-800">
              My Account
            </div>
            <hr className="border-t border-gray-200 mb-2" />

            {/* 🔗 Options */}
            <button
              onClick={() => handleNavigate("/profile")}
              className="w-full text-left px-4 py-2 text-sm font-semibold cursor-pointer text-gray-700 hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={() => handleNavigate("/orders")}
              className="w-full text-left px-4 py-2 text-sm font-semibold cursor-pointer text-gray-700 hover:bg-gray-100"
            >
              My Orders
            </button>
            <button
              onClick={() => OnSignOut()}
              className="w-full text-left px-4 py-2 text-sm font-semibold cursor-pointer text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

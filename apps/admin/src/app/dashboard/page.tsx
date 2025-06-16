'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBlogger, FaVideo, FaUserCircle, FaChevronDown  } from 'react-icons/fa';

const DashboardPage = () => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/login');
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-white p-8">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">👋 Welcome</h1>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <FaUserCircle className="text-2xl text-gray-700" />
            <span className="text-gray-800 font-medium">Sunita</span>
            <FaChevronDown className="text-sm mt-1" />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-2 z-50 border">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Blog Card */}
        <div
          onClick={() => router.push('/blog')}
          className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-emerald-500 hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 text-2xl">
              <FaBlogger />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Blog Section</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Manage, write and publish engaging blog posts seamlessly.
          </p>
        </div>

        {/* Reel Card */}
        <div
          onClick={() => router.push('/reels')}
          className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-2xl">
              <FaVideo />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Reel Section</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Upload, edit, and organize Instagram Reels effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaBlogger, FaVideo } from 'react-icons/fa';

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/login');
    }
  }, [router]);

  return (
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
  );
};

export default DashboardPage;

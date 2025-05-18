// apps/web/app/page.tsx

import React from "react";

const HomePage = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Doctor's Portal</h1>
      <p className="text-gray-600">
        Navigate to{" "}
        <a href="/blogs" className="text-blue-500 underline">
          Blogs
        </a>{" "}
        to see the latest articles.
      </p>
      <p className="text-gray-600">
        Navigate to{" "}
        <a href="/admin" className="text-blue-500 underline">
          Admin
        </a>{" "}
        to manage blogs (will be implemented soon).
      </p>
    </main>
  );
};

export default HomePage;

import React from 'react';
import { Card } from '@ui/*';
import Link from 'next/link';

const blogList = [
  { title: '5 Ways to Boost Your Immunity', slug: 'boost-immunity' },
  { title: 'Eating Right for Your Body Type', slug: 'eating-right' },
];

export default function BlogListPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Health Blogs</h1>
      <div className="space-y-4">
        {blogList.map(blog => (
          <Card key={blog.slug} title={blog.title}>
            <Link href={`/blogs/${blog.slug}`} className="text-blue-500 hover:underline">
              Read More
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
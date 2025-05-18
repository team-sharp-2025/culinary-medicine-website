// apps/web/app/api/blogs/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  // Sample static data — can be replaced with a DB call later
  const blogs = [
    { id: 1, title: 'Understanding Diabetes', summary: 'An overview of diabetes causes and treatment.' },
    { id: 2, title: 'Healthy Eating Tips', summary: 'Simple ways to improve your diet.' },
    { id: 3, title: 'Managing Stress', summary: 'Techniques to reduce stress and improve wellbeing.' },
  ];

  return NextResponse.json(blogs);
}

// apps/web/app/services/blogService.ts

export async function fetchBlogs() {
  const response = await fetch('http://localhost:3000/api/blogs', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }

  return response.json();
}

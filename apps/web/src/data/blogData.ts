export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Power of Mediterranean Diet',
    excerpt: 'Discover how the Mediterranean diet can improve your health and wellbeing.',
    content: '<p>The Mediterranean diet has long been celebrated as one of the healthiest eating patterns in the world...</p>',
    date: '2024-03-15',
    imageUrl: '/images/mediterranean-diet.jpg'
  }
]; 
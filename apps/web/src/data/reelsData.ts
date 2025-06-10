export interface Reel {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  date: string;
}

export const reelsData: Reel[] = [
  {
    id: 1,
    title: "Quick Mediterranean Salad",
    description: "Learn how to make a healthy Mediterranean salad in under 5 minutes",
    videoUrl: "/videos/med-salad.mp4",
    thumbnailUrl: "/images/med-salad-thumb.jpg",
    duration: "1:30",
    views: 1200,
    date: "2 days ago"
  }
]; 
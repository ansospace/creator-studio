export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    image: string;
  };
  date: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
}

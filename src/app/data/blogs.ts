// ? This is temporary file. It will be removed once API is integrated
import { Blog } from "../../types/blog";

export const blogs: Blog[] = [
  {
    id: "introduction-to-web-development",
    title: "Getting Started with Web Development",
    content: `
          <h2>Introduction to Web Development</h2>
          <p>Web development is an exciting field that combines creativity with technical skills...</p>
          <h2>Frontend Development</h2>
          <p>Frontend development focuses on what users see and interact with in their browsers...</p>
          <h2>Backend Development</h2>
          <p>Backend development deals with server-side logic and database management...</p>
        `,
    excerpt: "Learn the fundamentals of web development with this comprehensive guide...",
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    date: "2024-03-15",
    category: "Web Development",
    readTime: "5 min read",
    image: "/images/blog/web-dev.jpg",
    tags: ["Web Development", "Programming", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "css-best-practices",
    title: "CSS Best Practices for Modern Web Development",
    content: `
          <h2>Modern CSS Techniques</h2>
          <p>Learn about the latest CSS features and best practices for creating responsive layouts...</p>
          <h2>CSS Architecture</h2>
          <p>Discover how to structure your CSS for maintainability and scalability...</p>
          <h2>Performance Optimization</h2>
          <p>Tips and tricks for optimizing your CSS for better performance...</p>
        `,
    excerpt: "Learn the fundamentals of web development with this comprehensive guide...",
    author: {
      name: "John Doe",
      image: "https://github.com/johndoe.png",
    },
    date: "2024-03-15",
    category: "Web Development",
    readTime: "5 min read",
    image: "/images/blog/css-practices.jpg",
    tags: ["CSS", "Web Development", "Frontend", "Design", "Performance"],
  },
  {
    id: "machine-learning-basics",
    title: "Machine Learning Basics",
    content: `
          <h2>Understanding Machine Learning</h2>
          <p>An introduction to the core concepts of machine learning and its applications...</p>
          <h2>Types of Machine Learning</h2>
          <p>Exploring supervised, unsupervised, and reinforcement learning...</p>
          <h2>Getting Started</h2>
          <p>Essential tools and frameworks for beginning your ML journey...</p>
        `,
    excerpt: "Discover the core concepts of machine learning and artificial intelligence...",
    author: {
      name: "Jane Smith",
      image: "https://github.com/janesmith.png",
    },
    date: "2024-03-14",
    category: "AI & ML",
    readTime: "8 min read",
    image: "/images/blog/ml-basics.jpg",
    tags: ["Machine Learning", "AI", "Data Science", "Python", "Technology"],
  },
  {
    id: "future-of-education",
    title: "The Future of Education",
    content: `
          <h2>Digital Transformation in Education</h2>
          <p>How technology is reshaping traditional educational methods...</p>
          <h2>AI in Education</h2>
          <p>The role of artificial intelligence in personalized learning...</p>
          <h2>Remote Learning Evolution</h2>
          <p>The impact and future of remote and hybrid learning models...</p>
        `,
    excerpt: "Exploring how technology is transforming the educational landscape...",
    author: {
      name: "Mike Johnson",
      image: "https://github.com/mikejohnson.png",
    },
    date: "2024-03-13",
    category: "Education",
    readTime: "6 min read",
    image: "/images/blog/future-edu.jpg",
    tags: ["Education", "Technology", "E-learning", "Innovation", "Digital Transformation"],
  },
  {
    id: "cloud-computing-essentials",
    title: "Cloud Computing Essentials",
    content: `
          <h2>Cloud Computing Fundamentals</h2>
          <p>Understanding the basics of cloud computing and its service models...</p>
          <h2>Major Cloud Providers</h2>
          <p>Comparing AWS, Azure, and Google Cloud Platform...</p>
          <h2>Cloud Security</h2>
          <p>Best practices for securing your cloud infrastructure...</p>
        `,
    excerpt: "Master the fundamentals of cloud computing and learn about major platforms...",
    author: {
      name: "Sarah Wilson",
      image: "https://github.com/sarahwilson.png",
    },
    date: "2024-03-12",
    category: "Cloud Computing",
    readTime: "7 min read",
    image: "/images/blog/cloud-essentials.jpg",
    tags: ["Cloud Computing", "AWS", "Azure", "DevOps", "Infrastructure"],
  },
  {
    id: "react-state-management",
    title: "Modern State Management in React",
    content: `
          <h2>Understanding React State</h2>
          <p>Deep dive into React's state management approaches and best practices...</p>
          <h2>Popular State Management Libraries</h2>
          <p>Comparing Redux, Zustand, Jotai, and React Query for different use cases...</p>
          <h2>Context API vs State Management Libraries</h2>
          <p>When to use React's built-in Context API versus external libraries...</p>
        `,
    excerpt: "Explore different state management solutions for React applications...",
    author: {
      name: "Alex Chen",
      image: "https://github.com/alexchen.png",
    },
    date: "2024-03-11",
    category: "React",
    readTime: "10 min read",
    image: "/images/blog/react-state.jpg",
    tags: ["React", "JavaScript", "State Management", "Frontend", "Programming"],
  },
  {
    id: "cybersecurity-basics",
    title: "Essential Cybersecurity Practices",
    content: `
          <h2>Security Fundamentals</h2>
          <p>Understanding basic security principles and common threats...</p>
          <h2>Security Best Practices</h2>
          <p>Implementing secure coding practices and security measures...</p>
          <h2>Security Tools and Technologies</h2>
          <p>Essential tools and technologies for maintaining security...</p>
        `,
    excerpt: "Learn fundamental cybersecurity practices to protect your applications...",
    author: {
      name: "Emma Watson",
      image: "https://github.com/emmawatson.png",
    },
    date: "2024-03-10",
    category: "Security",
    readTime: "8 min read",
    image: "/images/blog/security.jpg",
    tags: ["Security", "Cybersecurity", "Web Security", "Best Practices", "Technology"],
  },
  // Add more dummy blogs as needed
];

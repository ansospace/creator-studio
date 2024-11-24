import { notFound } from "next/navigation";

import { BlogDetails } from "./_components/BlogDetails";

// Mock function to fetch blog data - replace with actual API call
const getBlog = async (id: string) => {
  // Simulating API call
  return {
    status: "success",
    data: {
      blog: {
        id,
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
    },
  };
};

interface BlogPageProps {
  params: {
    blogId: string;
  };
}

const BlogPage = async ({ params }: BlogPageProps) => {
  if (!params.blogId) {
    notFound();
  }

  const response = await getBlog(params.blogId);
  if (!response.data?.blog) {
    notFound();
  }

  return <BlogDetails blog={response.data.blog} />;
};

export default BlogPage;

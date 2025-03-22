import { blogs } from "../app/data/blogs";
import { Blog } from "../types/blog";

export const fetchBlogs = async (query?: string) => {
  if (!query) return blogs;

  return blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.category.toLowerCase().includes(query.toLowerCase()) ||
      blog.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
      blog.excerpt.toLowerCase().includes(query.toLowerCase())
  );
};

export const fetchBlogById = async (id: string) => {
  return blogs.find((blog) => blog.id === id);
};

export const fetchBlogsByCategory = async (category: string) => {
  return blogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase());
};

export const fetchRelatedBlogs = (currentBlog: Blog) => {
  return blogs
    .filter(
      (blog) =>
        blog.id !== currentBlog.id &&
        (blog.category === currentBlog.category || blog.tags?.some((tag) => currentBlog.tags?.includes(tag)))
    )
    .slice(0, 3); // Return top 3 related blogs
};

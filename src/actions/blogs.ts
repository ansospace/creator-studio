import { blogs } from "../app/data/blogs";
import { Blog } from "../types/blog";

export interface BlogFilters {
  query?: string;
  category?: string;
  tags?: string[];
}

export const fetchBlogs = async (filters?: BlogFilters | string) => {
  // Handle backward compatibility with string query
  if (typeof filters === "string") {
    const query = filters;
    if (!query) return blogs;

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.category.toLowerCase().includes(query.toLowerCase()) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
        blog.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }

  // If no filters provided, return all blogs
  if (!filters || Object.keys(filters).length === 0) return blogs;

  // Apply filters
  return blogs.filter((blog) => {
    // Check if blog matches all provided filters

    // Filter by search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matchesQuery =
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(query));

      if (!matchesQuery) return false;
    }

    // Filter by category
    if (filters.category && blog.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((filterTag) =>
        blog.tags.some((blogTag) => blogTag.toLowerCase() === filterTag.toLowerCase())
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });
};

export const getBlog = async (id: string) => {
  return blogs.find((blog) => blog.id === id);
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

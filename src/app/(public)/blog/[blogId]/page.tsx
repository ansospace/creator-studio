import { notFound } from "next/navigation";

import { blogs } from "../../../data/blogs";
import { BlogDetails } from "./_components/BlogDetails";

// Mock function to fetch blog data - replace with actual API call
const getBlog = async (id: string) => {
  return blogs.find(({ id: blogId }) => id === blogId);
};

interface BlogPageProps {
  params: Promise<{ blogId: string }>;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { blogId } = await params;

  const blogDetails = await getBlog(blogId);
  if (!blogDetails) {
    notFound();
  }

  return <BlogDetails blog={blogDetails} />;
};

export default BlogPage;

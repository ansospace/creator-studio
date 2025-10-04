import { notFound } from "next/navigation";

import { getBlog } from "../../../../actions/blogs";
import { BlogDetails } from "./_components/BlogDetails";

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

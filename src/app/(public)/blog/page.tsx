import { fetchBlogs } from "@/actions/blogs";

import { Blogs } from "./_components/Blogs";

const BlogPage = async () => {
  const initialBlogs = await fetchBlogs();

  return <Blogs initialBlogs={initialBlogs} />;
};

export default BlogPage;

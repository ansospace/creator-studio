"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Search } from "lucide-react";

import { Button, Card, CardContent, CardHeader, Input, Typography } from "@/components/ui";

// Dummy blog data
const blogs = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    excerpt: "Learn the fundamentals of web development with this comprehensive guide...",
    author: "John Doe",
    date: "2024-03-15",
    category: "Web Development",
    readTime: "5 min read",
    image: "/images/html.svg",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    excerpt: "Discover the core concepts of machine learning and artificial intelligence...",
    author: "Jane Smith",
    date: "2024-03-14",
    category: "AI & ML",
    readTime: "8 min read",
    image: "/images/Innovation-bro.svg",
  },
  {
    id: 3,
    title: "The Future of Education",
    excerpt: "Exploring how technology is transforming the educational landscape...",
    author: "Mike Johnson",
    date: "2024-03-13",
    category: "Education",
    readTime: "6 min read",
    image: "/images/Teleportation-bro.svg",
  },
  // Add more dummy blogs as needed
];

export const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <Typography variant="h1" className="mb-4">
          Latest from Our <span className="text-primary">Blog</span>
        </Typography>
        <Typography className="text-muted-foreground">
          Stay updated with the latest insights, tutorials, and articles
        </Typography>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="mx-auto max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-video">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  objectFit="contain"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary">{blog.category}</span>
                  <span className="text-sm text-muted-foreground">{blog.readTime}</span>
                </div>
                <Typography variant="h3" className="line-clamp-2 text-xl font-semibold">
                  {blog.title}
                </Typography>
              </CardHeader>
              <CardContent>
                <Typography className="mb-4 line-clamp-3 text-muted-foreground">{blog.excerpt}</Typography>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">By {blog.author}</span>
                  <span className="text-sm text-muted-foreground">{new Date(blog.date).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="py-8 text-center">
          <Typography className="text-muted-foreground">No blogs found matching your search.</Typography>
          <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { Search } from "lucide-react";

import { Button, Card, CardContent, CardHeader, Input, Typography } from "@/components/ui";
import { Blog } from "@/types/blog";

import { useBlogFilters } from "./useBlogFilters";

interface BlogsProps {
  initialBlogs: Blog[];
}

export const Blogs: FC<BlogsProps> = ({ initialBlogs }) => {
  const { blogs, isLoading, filters, updateFilters } = useBlogFilters(initialBlogs);

  // Get unique categories from initial blogs
  const categories = Array.from(new Set(initialBlogs.map((blog) => blog.category)));

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

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="mx-auto max-w-md">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search blogs..."
              className="pl-10"
              value={filters.query}
              onChange={(e) => updateFilters(e.target.value, undefined)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant={!filters.category ? "default" : "outline"}
            onClick={() => updateFilters(undefined, "")}
            className="text-sm"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={filters.category === category ? "default" : "outline"}
              onClick={() => updateFilters(undefined, category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="text-muted-foreground animate-pulse">Loading...</div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
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
                  <span className="text-primary text-sm">{blog.category}</span>
                  <span className="text-muted-foreground text-sm">{blog.readTime}</span>
                </div>
                <Typography variant="h3" className="line-clamp-2 text-xl font-semibold">
                  {blog.title}
                </Typography>
              </CardHeader>
              <CardContent>
                <Typography className="text-muted-foreground mb-4 line-clamp-3">{blog.excerpt}</Typography>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">By {blog.author.name}</span>
                  <span className="text-muted-foreground text-sm">{new Date(blog.date).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {!isLoading && blogs.length === 0 && (
        <div className="py-8 text-center">
          <Typography className="text-muted-foreground">No blogs found matching your criteria.</Typography>
          <Button variant="outline" className="mt-4" onClick={() => updateFilters("", "")}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

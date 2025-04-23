import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Clock } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Card, Typography } from "@/components/ui";
import { Blog } from "@/types/blog";

interface BlogDetailsProps {
  blog: Blog;
}

export const BlogDetails = ({ blog }: BlogDetailsProps) => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Back Button */}
      <Link href="/blog">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>
      </Link>

      <Card className="overflow-hidden">
        {/* Hero Image */}
        <div className="relative aspect-video w-full">
          <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
        </div>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="secondary">{blog.category}</Badge>
              <div className="text-muted-foreground flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4" />
                {blog.readTime}
              </div>
            </div>
            <Typography variant="h1" className="mb-4">
              {blog.title}
            </Typography>
          </div>

          {/* Author Info */}
          <div className="mb-8 flex items-center gap-3">
            <Avatar>
              <AvatarImage src={blog.author.image} alt={blog.author.name} />
              <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <Typography className="font-semibold">{blog.author.name}</Typography>
              <Typography className="text-muted-foreground text-sm">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

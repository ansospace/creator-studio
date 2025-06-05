import Image from "next/image";
import Link from "next/link";

import { Clock, Star, Users } from "lucide-react";

import { Badge, Button, CardContent, CardFooter, CardHeader, Typography } from "@/components/ui";
import { Course } from "@/types";

interface CourseGridProps {
  courses: Course[];
  viewMode: "grid" | "list";
  className?: string;
}

export const CourseGrid = ({ courses, viewMode, className }: CourseGridProps) => {
  return (
    <div className={className}>
      <div className={viewMode === "grid" ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
        {courses.map((course) => (
          <Link
            key={course._id}
            href={`/courses/${course._id}`}
            className={`group transition-all duration-200 hover:shadow-lg ${viewMode === "list" ? "flex" : ""}`}
          >
            {course.image && (
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image src={course.image} alt={course.title} className="object-cover" />
              </div>
            )}
            <div className={viewMode === "list" ? "flex-1" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Typography variant="h3">{course.title}</Typography>
                    <Typography>by {course.instructor}</Typography>
                  </div>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Typography>{course.description}</Typography>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Typography variant="span">{course.rating?.toFixed(1) ?? 0}</Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <Typography variant="span">{course.students?.toLocaleString() ?? 0} students</Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <Typography variant="span">{course.duration}</Typography>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Typography variant="span" className="text-lg font-bold">
                  ${course.price?.toFixed(2) ?? 0}
                </Typography>
                <Button>Enroll Now</Button>
              </CardFooter>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

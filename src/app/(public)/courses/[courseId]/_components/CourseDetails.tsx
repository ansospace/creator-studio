"use client";

import Image from "next/image";

import { Clock, Star, Users } from "lucide-react";

import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { Course } from "@/types";

interface CourseDetailsProps {
  course: Course;
}

export const CourseDetails = ({ course }: CourseDetailsProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="mb-4">
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="text-muted-foreground">by {course.instructor}</p>
              </div>
              {course.image && (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">About this course</h2>
                  <p className="mt-2 text-muted-foreground">{course.description}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{course.rating?.toFixed(1) ?? "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students?.toLocaleString() ?? 0} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <div className="mb-6">
                <span className="text-3xl font-bold">${course.price?.toFixed(2) ?? 0}</span>
              </div>
              <Button className="w-full" size="lg">
                Enroll Now
              </Button>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold">This course includes:</h3>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>• {course.duration} of content</li>
                    <li>• Access on all devices</li>
                    <li>• Certificate of completion</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

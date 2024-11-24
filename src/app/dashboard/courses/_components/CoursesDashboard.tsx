"use client";

import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui";
import { getCourses } from "@/lib/api";
import { Course } from "@/types";

import { CoursesTable } from "./CoursesTable";
import { CreateCourseDialog } from "./CreateCourseDialog";

export const CoursesDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        if (response.status === "success" && response.data) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleUpdateCourse = async (updatedCourse: Course) => {
    setCourses((prev) => prev.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)));
  };

  const handleDeleteCourse = async (courseId: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      <CoursesTable
        courses={courses}
        isLoading={isLoading}
        onUpdate={handleUpdateCourse}
        onDelete={handleDeleteCourse}
      />

      <CreateCourseDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  );
};

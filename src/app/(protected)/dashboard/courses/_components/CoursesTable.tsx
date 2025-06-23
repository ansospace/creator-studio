import { Edit, Trash } from "lucide-react";

import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { Course } from "@/types";

import { CoursesSkeleton } from "./CoursesSkeleton";

interface CoursesTableProps {
  courses: Course[];
  isLoading: boolean;
  onUpdate: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

export const CoursesTable = ({ courses, isLoading, onUpdate, onDelete }: CoursesTableProps) => {
  if (isLoading) {
    return <CoursesSkeleton />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Instructor</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell>{course.title}</TableCell>
            <TableCell>{course.instructor}</TableCell>
            <TableCell>{course.category}</TableCell>
            <TableCell>{course.level}</TableCell>
            <TableCell>${course.price}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => onUpdate(course)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(course.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

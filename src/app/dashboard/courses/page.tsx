import { Suspense } from "react";

import { CoursesDashboard } from "./_components/CoursesDashboard";
import { CoursesSkeleton } from "./_components/CoursesSkeleton";

const CoursesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Courses Management</h2>
        <p className="text-muted-foreground">Create and manage your courses.</p>
      </div>
      <Suspense fallback={<CoursesSkeleton />}>
        <CoursesDashboard />
      </Suspense>
    </div>
  );
};

export default CoursesPage;

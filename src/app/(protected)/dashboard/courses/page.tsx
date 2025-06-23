import { Suspense } from "react";

import { Typography } from "../../../components/ui";
import { CoursesDashboard } from "./_components/CoursesDashboard";
import { CoursesSkeleton } from "./_components/CoursesSkeleton";

const CoursesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2">Courses Management</Typography>
        <Typography>Create and manage your courses.</Typography>
      </div>
      <Suspense fallback={<CoursesSkeleton />}>
        <CoursesDashboard />
      </Suspense>
    </div>
  );
};

export default CoursesPage;

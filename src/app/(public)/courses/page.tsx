import { getCourses } from "@/lib/api";

import { Courses } from "./_components/Courses";

const CoursesPage = async () => {
  const courses = await getCourses();
  if (courses.status === "failed") {
    return <div>Error fetching courses</div>;
  }
  return <Courses initialCourses={courses.data?.courses ?? []} />;
};

export default CoursesPage;

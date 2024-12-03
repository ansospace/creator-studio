import { notFound } from "next/navigation";

import { getCourse } from "@/lib/api";

import { CourseDetails } from "./_components/CourseDetails";

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

const CoursePage = async ({ params }: CoursePageProps) => {
  if (!params.courseId) {
    notFound();
  }
  const response = await getCourse(params.courseId);

  if (response.status === "failed" || !response.data) {
    notFound();
  }

  return <CourseDetails course={response.data.course} />;
};

export default CoursePage;

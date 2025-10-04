import { notFound } from "next/navigation";

import { getCourse } from "@/lib/services";

import { CourseDetails } from "./_components/CourseDetails";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

const CoursePage = async (props: CoursePageProps) => {
  const params = await props.params;
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

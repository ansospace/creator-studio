import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { createCourse } from "@/lib/services";
import { Course, CreateCourse } from "@/types";

import { RootState } from "../redux/store";

interface UseCreateCourseProps {
  onClose: () => void;
}

export const useCreateCourse = ({ onClose }: UseCreateCourseProps) => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Course | CreateCourse>({
    resolver: zodResolver(CreateCourse),
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      category: "",
      level: "",
      price: 0,
      duration: "",
      authorId: userId || "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: createCourse,
    onSuccess: (response) => {
      if (response.status === "failed") {
        throw new Error("Failed to create course");
      }

      toast.success("Course created successfully");

      //   onCreate(response.data);
      //   form.reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to create course");
    },
  });

  const onSubmit = (data: Course) => {
    mutate(data);
  };

  return { isPending, handleSubmit, register, errors, onSubmit };
};

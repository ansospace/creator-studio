import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { createCourse } from "@/lib/services";
import { Course, createCourseSchema } from "@/types";

import { RootState } from "../redux/store";
import { useToast } from "./useToast";

interface UseCreateCourseProps {
  onClose: () => void;
}

export const useCreateCourse = ({ onClose }: UseCreateCourseProps) => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Course>({
    resolver: zodResolver(createCourseSchema),
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

      toast({
        title: "Success",
        description: "Course created successfully",
      });

      //   onCreate(response.data);
      //   form.reset();
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create course",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: Course) => {
    mutate(data);
  };

  return { isPending, handleSubmit, register, errors, onSubmit };
};

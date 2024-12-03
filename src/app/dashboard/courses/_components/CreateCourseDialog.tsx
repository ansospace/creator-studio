"use client";

import { Path } from "react-hook-form";

import { FormGenerator } from "@/components/global";
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui";
import { COURSE_FORM_FIELDS } from "@/constants/course.constants";
import { useCreateCourse } from "@/hooks/useCreateCourse";
import { Course } from "@/types";

interface CreateCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCourseDialog = ({ open, onOpenChange }: CreateCourseDialogProps) => {
  const { isPending, handleSubmit, register, errors, onSubmit } = useCreateCourse({
    onClose: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {COURSE_FORM_FIELDS.map((field) => (
            <FormGenerator<typeof field.inputType, Course>
              key={field.id}
              {...field}
              register={register}
              errors={errors}
              name={field.name as Path<Course>}
            />
          ))}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

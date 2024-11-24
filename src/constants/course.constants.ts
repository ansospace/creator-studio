export const COURSE_CATEGORIES = [
  { id: "1", value: "Development", label: "Development" },
  { id: "2", value: "Business", label: "Business" },
  { id: "3", value: "Design", label: "Design" },
  { id: "4", value: "Marketing", label: "Marketing" },
] as const;

export const COURSE_LEVELS = [
  { id: "1", value: "Beginner", label: "Beginner" },
  { id: "2", value: "Intermediate", label: "Intermediate" },
  { id: "3", value: "Advanced", label: "Advanced" },
] as const;

export const COURSE_DURATIONS = [
  { id: "1", value: "0-2", label: "0-2 hours" },
  { id: "2", value: "3-6", label: "3-6 hours" },
  { id: "3", value: "7-16", label: "7-16 hours" },
  { id: "4", value: "17+", label: "17+ hours" },
] as const;

export const COURSE_FORM_FIELDS = [
  {
    id: "course_title",
    inputType: "input",
    label: "Title",
    placeholder: "Course title",
    name: "title",
    type: "text",
  },
  {
    id: "course_description",
    inputType: "textarea",
    label: "Description",
    placeholder: "Course description",
    name: "description",
    type: "text",
    lines: 4,
  },
  {
    id: "course_instructor",
    inputType: "input",
    label: "Instructor",
    placeholder: "Instructor name",
    name: "instructor",
    type: "text",
  },
  {
    id: "course_category",
    inputType: "select",
    label: "Category",
    placeholder: "Select category",
    name: "category",
    options: COURSE_CATEGORIES,
  },
  {
    id: "course_level",
    inputType: "select",
    label: "Level",
    placeholder: "Select level",
    name: "level",
    options: COURSE_LEVELS,
  },
  {
    id: "course_price",
    inputType: "input",
    label: "Price",
    placeholder: "Course price",
    name: "price",
    type: "number",
  },
  {
    id: "course_duration",
    inputType: "input",
    label: "Duration",
    placeholder: "e.g., 2h 30m",
    name: "duration",
    type: "text",
  },
] as const;

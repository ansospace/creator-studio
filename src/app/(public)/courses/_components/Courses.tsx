"use client";

import { Grid, List, SlidersHorizontal } from "lucide-react";

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography,
} from "@/components/ui";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Course } from "../../../../types";
import { CourseFilters } from "./CourseFilters";
import { CourseGrid } from "./CourseGrid";
import { useCoursesFilter } from "./useCoursesFilter";

// // Mock data - replace with API call
// const mockCourses: Course[] = Array.from({ length: 12 }, (_, i) => ({
//   id: i.toString(),
//   authorId: "1",
//   title: `Course ${i + 1}`,
//   description: "Learn the fundamentals and advanced concepts...",
//   instructor: "John Doe",
//   rating: 4.5 + Math.random() * 0.5,
//   students: Math.floor(Math.random() * 5000),
//   duration: `${Math.floor(Math.random() * 20)}h`,
//   price: Math.floor(Math.random() * 100),
//   level: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
//   category: ["Development", "Business", "Design", "Marketing"][Math.floor(Math.random() * 4)],
// }));

interface CoursesProps {
  initialCourses: Course[];
}

export const Courses = ({ initialCourses }: CoursesProps) => {
  const { state, dispatch, filteredCourses } = useCoursesFilter(initialCourses);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Bar */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Input
            placeholder="Search courses..."
            value={state.searchQuery}
            onChange={(e) =>
              dispatch({
                type: "SET_SEARCH_QUERY",
                payload: e.target.value,
              })
            }
            className="max-w-sm"
          />
          <Select
            value={state.sortBy}
            onValueChange={(value) =>
              dispatch({
                type: "SET_SORT_BY",
                payload: value,
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <CourseFilters state={state} dispatch={dispatch} className="h-full overflow-y-auto" />
            </SheetContent>
          </Sheet>

          <Button
            variant={state.viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() =>
              dispatch({
                type: "SET_VIEW_MODE",
                payload: "grid",
              })
            }
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={state.viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() =>
              dispatch({
                type: "SET_VIEW_MODE",
                payload: "list",
              })
            }
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <CourseFilters state={state} dispatch={dispatch} className="hidden lg:col-span-1 lg:block" />
        <div className="lg:col-span-3">
          {filteredCourses.length === 0 ? (
            <div className="py-8 text-center">
              <Typography>No courses found matching your criteria.</Typography>
              <Button variant="outline" className="mt-4" onClick={() => dispatch({ type: "RESET_FILTERS" })}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <CourseGrid courses={filteredCourses} viewMode={state.viewMode} />
          )}
        </div>
      </div>
    </div>
  );
};

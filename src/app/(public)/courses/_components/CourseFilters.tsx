import { Button, Checkbox, Label, Slider } from "@/components/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { COURSE_CATEGORIES, COURSE_DURATIONS, COURSE_LEVELS } from "@/constants/course.constants";
import { FilterAction, FilterState } from "@/types";

interface CourseFiltersProps {
  className?: string;
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}

export const CourseFilters = ({ className, state, dispatch }: CourseFiltersProps) => {
  return (
    <div className={className}>
      <div className="bg-card rounded-lg border p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "RESET_FILTERS" })}>
            Reset
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {/* Category Filter */}
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {COURSE_CATEGORIES.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.value}
                      checked={state.categories.includes(category.value)}
                      onCheckedChange={() =>
                        dispatch({
                          type: "TOGGLE_CATEGORY",
                          payload: category.value,
                        })
                      }
                    />
                    <Label htmlFor={category.value}>{category.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Level Filter */}
          <AccordionItem value="level">
            <AccordionTrigger>Level</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {COURSE_LEVELS.map((level) => (
                  <div key={level.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={level.value}
                      checked={state.levels.includes(level.value)}
                      onCheckedChange={() =>
                        dispatch({
                          type: "TOGGLE_LEVEL",
                          payload: level.value,
                        })
                      }
                    />
                    <Label htmlFor={level.value}>{level.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price Filter */}
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  value={state.priceRange}
                  max={100}
                  step={1}
                  className="mt-6"
                  onValueChange={(value) =>
                    dispatch({
                      type: "SET_PRICE_RANGE",
                      payload: value as [number, number],
                    })
                  }
                />
                <div className="flex justify-between">
                  <span>${state.priceRange[0]}</span>
                  <span>${state.priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Duration Filter */}
          <AccordionItem value="duration">
            <AccordionTrigger>Duration</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {COURSE_DURATIONS.map((duration) => (
                  <div key={duration.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={duration.value}
                      checked={state.duration.includes(duration.value)}
                      onCheckedChange={() =>
                        dispatch({
                          type: "TOGGLE_DURATION",
                          payload: duration.value,
                        })
                      }
                    />
                    <Label htmlFor={duration.value}>{duration.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

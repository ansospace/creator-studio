import { useReducer } from "react";

import { Course, FilterAction, FilterState } from "@/types";

const initialState: FilterState = {
  categories: [],
  levels: [],
  priceRange: [0, 100],
  duration: [],
  searchQuery: "",
  sortBy: "newest",
  viewMode: "grid",
};

const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case "TOGGLE_CATEGORY":
      return {
        ...state,
        categories: state.categories.includes(action.payload)
          ? state.categories.filter((cat) => cat !== action.payload)
          : [...state.categories, action.payload],
      };
    case "TOGGLE_LEVEL":
      return {
        ...state,
        levels: state.levels.includes(action.payload)
          ? state.levels.filter((level) => level !== action.payload)
          : [...state.levels, action.payload],
      };
    case "SET_PRICE_RANGE":
      return {
        ...state,
        priceRange: action.payload,
      };
    case "TOGGLE_DURATION":
      return {
        ...state,
        duration: state.duration.includes(action.payload)
          ? state.duration.filter((dur) => dur !== action.payload)
          : [...state.duration, action.payload],
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };
    case "SET_VIEW_MODE":
      return {
        ...state,
        viewMode: action.payload,
      };
    case "RESET_FILTERS":
      return initialState;
    default:
      return state;
  }
};

export const useCoursesFilter = (initialCourses: Course[] | undefined) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  // Ensure courses is an array with a default empty array
  const courses = Array.isArray(initialCourses) ? initialCourses : [];

  // Debug log

  const filteredCourses = courses.filter((course) => {
    // Debug each filter condition
    if (state.searchQuery) {
      const matchesSearch = course.title.toLowerCase().includes(state.searchQuery.toLowerCase());
      if (!matchesSearch) return false;
    }

    if (state.categories.length > 0) {
      const matchesCategory = state.categories.includes(course.category || "");
      if (!matchesCategory) return false;
    }

    if (state.levels.length > 0) {
      const matchesLevel = state.levels.includes(course.level || "");
      if (!matchesLevel) return false;
    }

    if (course.price && (course.price < state.priceRange[0] || course.price > state.priceRange[1])) {
      return false;
    }

    if (state.duration.length > 0) {
      const hours = parseInt(course.duration || "0");
      const durationMatches = state.duration.some((range) => {
        const [min, max] = range.split("-").map((n) => parseInt(n));
        return hours >= min && (max ? hours <= max : true);
      });
      if (!durationMatches) return false;
    }

    return true;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (state.sortBy) {
      case "popular":
        return (b.students || 0) - (a.students || 0);
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default: // newest
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  });

  return {
    state,
    dispatch,
    filteredCourses: sortedCourses,
  };
};

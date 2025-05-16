import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { BlogFilters, fetchBlogs } from "@/actions/blogs";
import { Blog } from "@/types/blog";

import { useDebounce } from "../../../../hooks/useDebounce";

export const useBlogFilters = (initialBlogs: Blog[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get filters from URL
  const urlQuery = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  // Local state for immediate input value
  const [inputQuery, setInputQuery] = useState(urlQuery);
  const debouncedQuery = useDebounce(inputQuery, 200);

  // Use React Query for fetching blogs
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs", debouncedQuery, category],
    queryFn: async () => {
      // Create filters object with the current filter values
      const filters: BlogFilters = {};
      if (debouncedQuery) filters.query = debouncedQuery;
      if (category) filters.category = category;

      const blogs = await fetchBlogs(filters);
      return blogs;
    },
    initialData: initialBlogs,
  });

  // Update URL with filters when debounced value changes
  useEffect(() => {
    if (debouncedQuery !== urlQuery) {
      const params = new URLSearchParams(searchParams);
      if (debouncedQuery) params.set("query", debouncedQuery);
      else params.delete("query");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedQuery, urlQuery, pathname, router, searchParams]);

  // Update category filter
  const updateCategory = useCallback(
    (newCategory?: string) => {
      const params = new URLSearchParams(searchParams);

      if (newCategory !== undefined) {
        if (newCategory) params.set("category", newCategory);
        else params.delete("category");
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return {
    blogs,
    isLoading,
    filters: {
      query: inputQuery,
      category,
    },
    updateFilters: {
      setInputQuery,
      updateCategory,
    },
  };
};

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { useQuery } from "@tanstack/react-query";

import { fetchBlogs, fetchBlogsByCategory } from "@/actions/blogs";
import { Blog } from "@/types/blog";

import { useDebounce } from "../../../../hooks/useDebounce";

export const useBlogFilters = (initialBlogs: Blog[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get filters from URL
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  const debouncedQuery = useDebounce(query);

  // Use React Query for fetching blogs
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs", debouncedQuery, category],
    queryFn: async () => {
      if (category) {
        return fetchBlogsByCategory(category);
      }
      return fetchBlogs(debouncedQuery);
    },
    initialData: initialBlogs,
  });

  // Update URL with filters
  const updateFilters = useCallback(
    (newQuery?: string, newCategory?: string) => {
      const params = new URLSearchParams(searchParams);

      if (newQuery !== undefined) {
        if (newQuery) params.set("query", newQuery);
        else params.delete("query");
      }

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
      query,
      category,
    },
    updateFilters,
  };
};

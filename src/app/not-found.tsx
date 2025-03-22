import Link from "next/link";

import { Button, Typography } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-r from-slate-200 to-gray-200 px-[2vw] text-black dark:from-gray-800 dark:to-gray-900 dark:text-white">
      <div className="flex min-h-screen items-center justify-center px-2">
        <div className="text-center">
          <Typography variant="h1" className="sm:text-[3vw]">
            404 🧐
          </Typography>
          <Typography variant="h4" className="mt-[2vh] sm:text-[1.8vw]">
            Oops! Page not found 🚧
          </Typography>

          <Typography variant="p" className="w-full sm:w-[45vw] sm:text-[2vw] lg:text-[1vw]">
            Oops! It looks like the page you are trying to find does not exist. It could have been moved, renamed, or
            deleted. Please double-check the URL or head back to the homepage. We are here to help! 😕
          </Typography>

          <Button variant="destructive" className="mt-4" asChild>
            <Link href="/">🏠 Go Home </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

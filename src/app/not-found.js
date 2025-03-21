import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-r from-slate-200 to-gray-200 text-black dark:from-gray-800 dark:to-gray-900 dark:text-white">
      <div className="flex min-h-screen items-center justify-center px-2">
        <div className="text-center">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="mt-4 text-2xl font-medium">Oops! Page not found</p>
          <p className="mb-8 mt-4">Sorry, the page you are looking for doesn&apost exist.</p>
          <Link href={"/"}>
            <p className="rounded-full bg-white px-6 py-3 font-semibold transition duration-300 ease-in-out hover:bg-purple-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              Go Home
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

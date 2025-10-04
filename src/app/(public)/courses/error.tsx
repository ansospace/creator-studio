"use client";

import { Button, Typography } from "@/components/ui";

// Error boundaries must be Client Components
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-4 bg-red-50">
      <Typography variant="h2">Something went wrong! {error.message}</Typography>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}

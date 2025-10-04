"use client";

import { Button, Typography } from "../components/ui";

// Error boundaries must be Client Components

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    // global-error must include html and body tags
    <html lang="en">
      <body>
        <Typography variant="h2">Something went wrong! {error.message}</Typography>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}

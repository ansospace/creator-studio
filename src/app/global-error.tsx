"use client";

import { Button } from "../components/ui";

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
        <h2>Something went wrong! {error.message}</h2>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}

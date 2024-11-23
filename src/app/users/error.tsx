"use client";

// Error boundaries must be Client Components
import { Button } from "../../components/ui";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong! {error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}

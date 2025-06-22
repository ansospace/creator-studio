"use client";

import { useCallback, useEffect, useState } from "react";

import useUserInput from "@/app/(auth)/hooks/useUserInput";

const UsernameInput = () => {
  const [username, setUsername] = useState("");
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const { mutate, isPending, data, error } = useUserInput();

  const handleUsernameCheck = useCallback(() => {
    if (username.trim()) {
      mutate({ username: username.trim() });
      setHasChecked(true);
    }
  }, [mutate, username]);

  // Update availability state when data changes
  useEffect(() => {
    if (data && hasChecked) {
      if (data.status === "success") {
        setIsUserNameAvailable(data.data.isAvailable);
      }
    }
  }, [data, hasChecked]);

  return (
    <div className="flex flex-col">
      {isPending && hasChecked && <span className="text-sm text-blue-500">Checking availability...</span>}
      {error && <span className="text-sm text-red-600">{error.message}</span>}
      {hasChecked && isUserNameAvailable && !isPending && (
        <span className="text-sm text-green-600">Username is available!</span>
      )}
      {hasChecked && !isUserNameAvailable && !isPending && (
        <span className="text-sm text-red-600">Username is not available</span>
      )}

      <input
        type="text"
        id="username"
        placeholder="Enter your username"
        className="rounded-md border border-gray-300 bg-[#141416] p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onInput={(e) => {
          setUsername(e.currentTarget.value);
          setHasChecked(false); // Reset when user types
        }}
        onBlur={handleUsernameCheck}
        value={username}
        disabled={isPending}
      />
    </div>
  );
};

export default UsernameInput;

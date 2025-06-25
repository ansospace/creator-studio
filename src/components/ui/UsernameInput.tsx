"use client";

import { useCallback, useEffect, useState } from "react";

import useUserInput from "@/app/(auth)/hooks/useUserInput";

interface UsernameInputProps {
  readOnly?: boolean;
  editMode?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  onAvailabilityCheckResult?: (isAvailable: boolean, data: any) => void;
  placeholder?: string;
  label?: string;
}

const UsernameInput = ({
  readOnly = false,
  editMode = false,
  value,
  onChange,
  disabled = false,
  onAvailabilityCheckResult,
  placeholder = "Enter your username",
  label = "Username",
  ...props
}: UsernameInputProps) => {
  const [internalUsername, setInternalUsername] = useState("");
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const { mutate, isPending, data, error } = useUserInput();

  // Use controlled value if provided, otherwise use internal state
  const username = value !== undefined ? value : internalUsername;

  const handleUsernameCheck = useCallback(() => {
    if (username.trim() && !readOnly && !disabled) {
      mutate({ username: username.trim() });
      setHasChecked(true);
    }
  }, [mutate, username, readOnly, disabled]);

  // Update availability state when data changes
  useEffect(() => {
    if (data && hasChecked) {
      if (data.status === "success") {
        const available = data.data.isAvailable;
        setIsUserNameAvailable(available);

        // Call the callback if provided
        if (onAvailabilityCheckResult) {
          onAvailabilityCheckResult(available, data);
        }
      }
    }
  }, [data, hasChecked, onAvailabilityCheckResult]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    if (!readOnly && editMode && !disabled) {
      if (onChange) {
        // Controlled component
        onChange(newValue);
      } else {
        // Uncontrolled component
        setInternalUsername(newValue);
      }
      setHasChecked(false); // Reset when user types
    }
  };

  const isInputDisabled = isPending || readOnly || !editMode || disabled;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor="username" className="mb-1 text-sm font-medium">
          {label}
        </label>
      )}

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
        placeholder={readOnly ? `${placeholder} (read-only)` : placeholder}
        className={`rounded-md border border-gray-300 bg-[#141416] p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          readOnly ? "cursor-not-allowed opacity-60" : ""
        }`}
        onInput={handleInputChange}
        onBlur={handleUsernameCheck}
        value={username}
        disabled={isInputDisabled}
        readOnly={readOnly}
        {...props}
      />
    </div>
  );
};

export default UsernameInput;

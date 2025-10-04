import { useMutation } from "@tanstack/react-query";

import { checkUsernameAvailability } from "@/lib/services";

import { IApiResponse } from "../../../types";

const useUserInput = () => {
  const { isPending, mutate, data, error } = useMutation<
    IApiResponse<{ isAvailable: boolean }>,
    Error,
    { username: string }
  >({
    mutationFn: checkUsernameAvailability,
    onError: (error) => {
      error.message = error.message || "An error occurred while checking username availability.";
    },
  });

  return {
    isPending,
    mutate,
    data,
    error,
  };
};

export default useUserInput;

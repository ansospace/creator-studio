import { useMutation } from "@tanstack/react-query";

import { checkUsernameAvailability } from "@/lib/services";

const useUserInput = () => {
  const { isPending, mutate, data, error } = useMutation<any, Error, any>({
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

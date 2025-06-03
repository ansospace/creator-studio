import { useMutation } from "@tanstack/react-query";

import { sendOtp } from "@/lib/services";
import { OtpEvent } from "@/types";

export const useRequestOtp = () => {
  const { isPending, mutate, error, data } = useMutation({
    mutationFn: (otpEventData: OtpEvent) => sendOtp(otpEventData),
  });

  console.log({ error });

  // mutate({
  //   email: "",
  //   actionType: "login",
  //   otpType: "email",
  // });

  return {
    isRequestingOtp: isPending,
    requestOtp: mutate,
    requestOtpError: error,
    requestOtpData: data,
  };
};

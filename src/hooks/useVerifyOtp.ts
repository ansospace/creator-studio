import { useMutation } from "@tanstack/react-query";

import { verifyOtp } from "@/lib/services";
import { OtpVerifyEvent } from "@/types";

export const useVerifyOtp = (
  onSuccessCallback?: (data: any) => void, // Define a more specific type if possible
  onErrorCallback?: (error: any) => void
) => {
  const {
    isPending,
    mutate,
    error,
    data, // The response data, potentially containing an action token
  } = useMutation({
    mutationFn: (otpData: OtpVerifyEvent) => verifyOtp(otpData),
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
  });

  return {
    isVerifying: isPending,
    verifyOtp: mutate,
    verificationError: error,
    verificationData: { ...data },
  };
};

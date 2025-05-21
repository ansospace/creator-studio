import { useMutation } from "@tanstack/react-query";

import { resendOtp } from "@/lib/services";
import { OtpEvent } from "@/types";

export const useRequestOtp = (onSuccessCallback?: (data: any) => void, onErrorCallback?: (error: any) => void) => {
  const { isPending, mutate, error, data } = useMutation({
    mutationFn: (otpEventData: OtpEvent) => resendOtp(otpEventData),
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
  });

  return {
    isRequestingOtp: isPending,
    requestOtp: mutate,
    requestOtpError: error,
    requestOtpData: { ...data },
  };
};

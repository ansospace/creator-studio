"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { COOKIES, NotificationType, SESSION_STORAGE_KEY } from "@/constants";
import { useSessionStorage } from "@/hooks";
import { saveCookie } from "@/lib/server";
import { loginUser, sendOtp } from "@/lib/services";
import { LoginSchema, VerifyOTP } from "@/types";

export const useLogin = () => {
  const router = useRouter();
  const [_, setActionData] = useSessionStorage<VerifyOTP | null>(SESSION_STORAGE_KEY.AUTH_ACTION, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (res) => {
      if (res.status === "success") {
        const { data, message } = res;

        toast.success(message);
        saveCookie(COOKIES.USER_ID, data.userId);
        router.replace("/dashboard");
      } else {
        if (res.code === "email_not_verified") {
          const email = getValues("email");
          if (email) {
            const res = await sendOtp({
              email,
              otpType: NotificationType.EMAIL_VERIFICATION_OTP,
            });
            if (res.status === "success" && res.data.token) {
              setActionData({
                token: res.data.token,
                otpType: NotificationType.EMAIL_VERIFICATION_OTP,
                email,
              });
              router.push("/verify-otp");
            }
          }
        }
        toast.error(res.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return { isPending, handleSubmit, register, errors, onSubmit };
};

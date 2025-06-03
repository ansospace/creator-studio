"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { COOKIES, SESSION_STORAGE_KEY } from "@/constants";
import { useToast } from "@/hooks/useToast";
import { saveCookie } from "@/lib/server";
import { loginUser, sendOtp } from "@/lib/services";
import { LoginSchema } from "@/types/auth";

import { NotificationType } from "../../../constants/events.constant";
import { useSessionStorage } from "../../../hooks";
import { VerifyOTP } from "../../../types";

export const useLogin = () => {
  const { toast } = useToast();
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
    onSuccess: async (data) => {
      if (data.status === "success") {
        toast({
          title: "Success",
          description: data.message,
        });
        saveCookie(COOKIES.USER_ID, data.data.userId);
        router.replace("/dashboard");
      } else {
        if (data.code === "email_not_verified") {
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
              });
            }
          }
          router.push("/verify-otp");
        }
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return { isPending, handleSubmit, register, errors, onSubmit };
};

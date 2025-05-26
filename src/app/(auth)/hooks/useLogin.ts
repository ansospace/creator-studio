"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useToast } from "@/hooks/useToast";
import { loginUser, sendOtp } from "@/lib/services";
import { LoginSchema } from "@/types/auth";

import { useAuthContext } from "../AuthContext";

export const useLogin = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setActionData } = useAuthContext();

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
        router.replace("/dashboard");
      } else {
        if (data.code === "email_not_verified") {
          const email = getValues("email");
          if (email) {
            const res = await sendOtp({ email, otpType: "sendEmailVerificationOTP" });
            if (res.status === "success" && res.data?.token) {
              setActionData(res.data.token, email, "sendEmailVerificationOTP");
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

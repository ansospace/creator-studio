import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { SESSION_STORAGE_KEY } from "@/constants";
import { useSessionStorage, useToast } from "@/hooks";
import { signup } from "@/lib/services";
import { SignUpSchema, VerifyOTP } from "@/types";

import { NotificationType } from "../../../constants/events.constant";

export const useSignUp = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });
  const [_, setActionData] = useSessionStorage<VerifyOTP | null>(SESSION_STORAGE_KEY.AUTH_ACTION, null);

  const { isPending, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (res) => {
      if (res.status === "success") {
        const { data, message } = res;
        toast({
          title: "Sign up successful",
          description: message,
        });
        setActionData(null);
        setActionData({
          token: data.token,
          otpType: NotificationType.EMAIL_VERIFICATION_OTP,
        });
        router.push("/verify-otp");
      } else {
        toast({
          title: "Sign up failed",
          description: res.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SignUpSchema) => {
    mutate(data);
  };

  return { isPending, handleSubmit, register, errors, onSubmit };
};

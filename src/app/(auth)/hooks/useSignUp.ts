import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { COOKIES, NotificationType, SESSION_STORAGE_KEY } from "@/constants";
import { useSessionStorage } from "@/hooks";
import { saveCookie } from "@/lib/server";
import { signup } from "@/lib/services";
import { SignUpSchema, VerifyOTP } from "@/types";

export const useSignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });
  const [_, setActionData] = useSessionStorage<VerifyOTP | null>(SESSION_STORAGE_KEY.AUTH_ACTION, null);

  const { isPending, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (res) => {
      if (res.status === "success") {
        const { data, message } = res;
        toast.success(message);
        saveCookie(COOKIES.USER_ID, data.userId);
        setActionData({
          token: data.token,
          otpType: NotificationType.EMAIL_VERIFICATION_OTP,
          email: getValues("email"),
        });
        router.push("/verify-otp");
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: SignUpSchema) => {
    mutate(data);
  };

  return { isPending, handleSubmit, register, errors, onSubmit };
};

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useToast } from "@/hooks/useToast";
import { signup } from "@/lib/services";
import { SignUpSchema } from "@/types/auth";

import { useAuthContext } from "../AuthContext";

export const useSignUp = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });
  const { setActionData } = useAuthContext();

  const { isPending, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: ({ status, data, message }) => {
      if (status === "success") {
        toast({
          title: "Sign up successful",
          description: message,
        });
        if (data?.emailVerificationToken) {
          setActionData(data.emailVerificationToken, getValues().email, "sendEmailVerificationOTP");
        }
        router.push("/verify-otp");
      } else {
        toast({
          title: "Sign up failed",
          description: message,
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

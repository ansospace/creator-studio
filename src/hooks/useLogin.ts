import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { authenticateUser } from "../actions/auth";
import { getAccessToken } from "../lib/server";
import { setCredentials } from "../redux/features/authSlice";
import { LoginSchema } from "../types/auth";
import { useToast } from "./use-toast";

export const useLogin = () => {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  if (searchParams.get("error")) {
    toast({
      title: "Error",
      description: "Failed to login",
      variant: "destructive",
    });
  }

  const { isPending, mutate } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: async (data) => {
      if (data.status === "success") {
        const accessToken = await getAccessToken();
        if (accessToken) {
          dispatch(setCredentials({ accessToken }));
        }

        toast({
          title: "Success",
          description: data.message,
        });
        router.replace("/dashboard");
      } else {
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

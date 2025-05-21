"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { loginUser } from "@/lib/services";

import { useToast } from "../../../hooks/useToast";
import { LoginSchema } from "../../../types/auth";

export const useLogin = () => {
  const { toast } = useToast();
  const router = useRouter();
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
    mutationFn: loginUser,
    onSuccess: async (data) => {
      if (data.status === "success") {
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

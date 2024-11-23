"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { useToast } from "@/hooks/useToast";
import { updateProfile } from "@/lib/api";
import { setUser } from "@/redux/features/authSlice";
import { Profile, ProfileSchema } from "@/types/profile";

export const useUpdateProfile = (initialData?: Profile) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      bio: initialData?.profile?.bio || "",
      phoneNumber: initialData?.profile?.phoneNumber || "",
      address: {
        street: initialData?.profile?.address?.street || "",
        city: initialData?.profile?.address?.city || "",
        country: initialData?.profile?.address?.country || "",
        zipCode: initialData?.profile?.address?.zipCode || "",
      },
      socialLinks: {
        twitter: initialData?.profile?.socialLinks?.twitter || "",
        linkedin: initialData?.profile?.socialLinks?.linkedin || "",
        github: initialData?.profile?.socialLinks?.github || "",
      },
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: ProfileSchema) => {
      const response = await updateProfile(data);
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      return response.json();
    },
    onSuccess: (data) => {
      dispatch(setUser(data.data));
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileSchema) => {
    const cleanedData = {
      ...data,
      socialLinks: data.socialLinks
        ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Object.fromEntries(Object.entries(data.socialLinks).filter(([_, value]) => value && value.length > 0))
        : undefined,
    };

    if (cleanedData.socialLinks && Object.keys(cleanedData.socialLinks).length === 0) {
      delete cleanedData.socialLinks;
    }

    mutate(cleanedData);
  };

  return { isPending, handleSubmit, register, errors, onSubmit };
};

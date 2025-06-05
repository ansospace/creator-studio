"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { upsertProfile } from "@/lib/services";
import { Profile, ProfileSchema } from "@/types/profile";

import { setUser } from "../redux/features/authSlice";

const initialProfileData: Profile = {
  profile: {
    userId: "",
    bio: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      country: "",
      zipCode: "",
    },
  },
  user: {
    id: "",
    username: "",
    email: "",
    isEmailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const useUpdateProfile = (initialData: Profile = initialProfileData) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      userId: initialData?.user.id,
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
    mutationFn: upsertProfile,
    onSuccess: (data) => {
      if (data.status === "success" && data.data) {
        dispatch(setUser({ profile: data.data, user: initialData.user }));
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: ProfileSchema) => {
    const cleanedData = {
      ...data,
      socialLinks: data.socialLinks
        ? Object.fromEntries(Object.entries(data.socialLinks).filter(([_, value]) => value && value.length > 0))
        : undefined,
    };

    if (cleanedData.socialLinks && Object.keys(cleanedData.socialLinks).length === 0) {
      delete cleanedData.socialLinks;
    }

    mutate(cleanedData);
  };

  return { isPending, handleSubmit, register, errors, onSubmit };
};

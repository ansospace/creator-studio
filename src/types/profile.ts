import { z } from "zod";

import { GetUser } from "./user";

export const ProfileSchema = z.object({
  userId: z.string(),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),
  phoneNumber: z.string().optional(),
  socialLinks: z
    .object({
      twitter: z.string().trim().url().optional().or(z.literal("")),
      linkedin: z.string().trim().url().optional().or(z.literal("")),
      github: z.string().trim().url().optional().or(z.literal("")),
    })
    .optional(),
});

export const validateProfileSchema = (data: ProfileSchema) => {
  // Check if at least one key from profileSchema is present in the data, excluding userId
  const hasAnyKey = Object.keys(ProfileSchema.shape)
    .filter((key) => key !== "userId")
    .some((key) => key in data && data[key as keyof ProfileSchema] !== undefined);

  if (!hasAnyKey) {
    throw new z.ZodError([
      {
        code: z.ZodIssueCode.custom,
        path: Object.keys(ProfileSchema.shape).filter((key) => key !== "userId"),
        message: "At least one field from the profile schema must be provided",
      },
    ]);
  }

  return ProfileSchema.parse(data);
};

export type ProfileSchema = z.infer<typeof ProfileSchema>;
export type CreateProfileData = Omit<ProfileSchema, "userId">;
export type Profile = { profile: ProfileSchema; user: GetUser };

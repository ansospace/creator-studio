import { z } from "zod";

import { userSchema } from "./user";

export const LoginSchema = z
  .object({
    email: userSchema.shape.email.optional(),
    username: userSchema.shape.username.optional().refine((val) => val === undefined || val.length >= 3, {
      message: "Username must be at least 3 characters",
    }),
    password: userSchema.shape.password,
    rememberMe: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.email == null && data.username == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide either an email or a username",
        path: ["email", "username"],
      });
    }
    if (data.password == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
        path: ["password"],
      });
    }
  });

export const SignUpSchema = userSchema
  .pick({
    email: true,
    username: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match password",
    path: ["confirmPassword"],
  });

export type LoginSchema = z.infer<typeof LoginSchema>;
export type SignUpSchema = z.infer<typeof SignUpSchema>;

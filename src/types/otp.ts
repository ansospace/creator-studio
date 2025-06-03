import { z } from "zod";

import { NotificationType, notificationTypeSchema } from "@/constants/events.constant";

import { userSchema } from "./user";

export const otp = z.string().length(6);

// Define separate schemas for each OTP type
const emailVerificationOtpSchema = z.object({
  otpType: z.literal(NotificationType.EMAIL_VERIFICATION_OTP),
  email: userSchema.shape.email,
});

const forgetPasswordOtpSchema = z.object({
  otpType: z.literal(NotificationType.FORGET_PASSWORD_OTP),
  email: userSchema.shape.email,
});

// const phoneVerificationOtpSchema = z.object({
//   otpType: z.literal(NotificationType.PHONE_VERIFICATION),
//   phoneNumber: z.string().min(1, "Phone number is required"),
// });

// Use discriminatedUnion with the separate schemas
export const otpEvent = z.discriminatedUnion("otpType", [
  emailVerificationOtpSchema,
  forgetPasswordOtpSchema,
  // phoneVerificationOtpSchema,
]);

export const VerifyOTP = z.object({
  otpType: notificationTypeSchema,
  token: z.string().min(1, "Token is required"),
});

export const otpSchema = z.object({
  id: z.string(),
  otp,
  userId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id"),
  expiryTime: z.date(),
  otpType: notificationTypeSchema,
});

export const saveOtpSchema = otpSchema.omit({ id: true });
export const getOtpSchema = otpSchema.pick({
  userId: true,
  otpType: true,
});

// Update types based on the new schemas
export type OtpSchema = z.infer<typeof otpSchema>;
export type OTP = z.infer<typeof otp>;
export type OtpEvent = z.infer<typeof otpEvent>;
export type GetOtp = z.infer<typeof getOtpSchema>;
export type SaveOtp = z.infer<typeof saveOtpSchema>;
export type VerifyOTP = z.infer<typeof VerifyOTP>;

export const VerifyOTPSchema = z.object({
  otp,
  otpType: notificationTypeSchema,
  token: z.string().min(1, "Token is required"),
});

export type VerifyOTPSchema = z.infer<typeof VerifyOTPSchema>;

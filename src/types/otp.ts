import { z } from "zod";

import { userSchema } from "./user";

export const otpType = ["sendEmailVerificationOTP", "verifyPhoneNumber", "sendForgetPasswordOTP"] as const;
export const OtpType = z.enum(otpType);

export const otp = z.string().length(6);

const sendEmailVerificationOtpSchema = z.object({
  otpType: z.literal(OtpType.enum.sendEmailVerificationOTP),
  email: userSchema.shape.email,
});

const sendForgetPasswordOtpSchema = z.object({
  otpType: z.literal(OtpType.enum.sendForgetPasswordOTP),
  email: userSchema.shape.email,
});

const phoneOtpSchema = z.object({
  otpType: z.literal(OtpType.enum.verifyPhoneNumber),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

export const otpEvent = z.discriminatedUnion("otpType", [
  sendEmailVerificationOtpSchema,
  sendForgetPasswordOtpSchema,
  phoneOtpSchema,
]);

export const OtpVerifyEvent = z.object({
  otp,
  otpType: OtpType,
  token: z.string().min(1, "Token is required"),
});

export const otpSchema = z.object({
  id: z.string(),
  otp,
  userId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id"),
  expiryTime: z.date(),
  otpType: OtpType,
});

export const saveOtpSchema = otpSchema.omit({ id: true });
export const getOtpSchema = otpSchema.pick({
  userId: true,
  otpType: true,
});

export type OtpSchema = z.infer<typeof otpSchema>;
export type OTP = z.infer<typeof otp>;
export type OtpEvent = z.infer<typeof otpEvent>;
export type GetOtp = z.infer<typeof getOtpSchema>;
export type SaveOtp = z.infer<typeof saveOtpSchema>;
export type OtpVerifyEvent = z.infer<typeof OtpVerifyEvent>;
export type OtpType = z.infer<typeof OtpType>;

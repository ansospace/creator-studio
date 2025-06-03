"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui";
import { useSessionStorage, useToast } from "@/hooks";

import { SESSION_STORAGE_KEY } from "../constants";
import { NotificationType } from "../constants/events.constant";
import { sendOtp, verifyOtp } from "../lib/services";
import { OtpEvent, VerifyOTP, VerifyOTPSchema } from "../types";

interface OtpVerificationModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  email?: string; // Email is required to request/verify OTP
  phoneNumber?: string; // Phone is optional
  otpType: NotificationType; // Specify the type of OTP verification (e.g., signup, password reset)
  token: string; // Optional token, e.g., emailVerificationToken from signup
  onVerificationSuccessAction: (data: any) => void; // Callback after successful verification
}

export const OtpVerificationModal = ({
  isOpen,
  onCloseAction,
  email,
  otpType,
  token,
  onVerificationSuccessAction,
}: OtpVerificationModalProps) => {
  const { toast } = useToast();
  const [_, setActionData] = useSessionStorage<VerifyOTP | null>(SESSION_STORAGE_KEY.AUTH_ACTION, null);

  const { isPending: isVerifying, mutate: handleVerifyOtp } = useMutation({
    mutationFn: (otpData: VerifyOTPSchema) => verifyOtp(otpData),
    onSuccess: (res) => {
      if (res.status === "success") {
        const { data, message } = res;
        toast({
          title: "OTP verified",
          description: message,
        });
        setActionData(null);
        onVerificationSuccessAction(data);
      } else {
        toast({
          title: "Failed to verify OTP",
          description: res.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to verify OTP",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { isPending: isRequestingOtp, mutate: requestOtp } = useMutation({
    mutationFn: (otpEventData: OtpEvent) => sendOtp(otpEventData),
    onSuccess: (res) => {
      if (res.status === "success") {
        const { data, message } = res;
        toast({
          title: "Sign up successful",
          description: message,
        });
        setActionData(null);
        onVerificationSuccessAction(data);
      } else {
        toast({
          title: "Sign up failed",
          description: res.message,
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

  const form = useForm<VerifyOTPSchema>({
    resolver: zodResolver(VerifyOTPSchema),
    defaultValues: {
      otp: "",
      otpType: otpType,
      token: token,
    },
  });

  // Update form token if the prop changes (useful if token is fetched async)
  useEffect(() => {
    if (token) {
      form.setValue("token", token);
    }
  }, [token, form]);

  const onSubmit = (data: VerifyOTPSchema) => {
    handleVerifyOtp(data);
  };

  const handleResend = () => {
    if (email) {
      requestOtp({ otpType: NotificationType.EMAIL_VERIFICATION_OTP, email }); // Add phoneNumber her
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl">Verify OTP</DialogTitle>
          <DialogDescription>Enter the 6-digit code sent to {email}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Error messages are handled by the toast in the hooks */}
              <Button type="submit" className="w-full" disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          </Form>
          <Button variant="link" className="w-full" onClick={handleResend} disabled={!email || isRequestingOtp}>
            {isRequestingOtp ? "Sending..." : "Resend OTP"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

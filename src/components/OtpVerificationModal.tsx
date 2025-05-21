"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRequestOtp, useToast, useVerifyOtp } from "@/hooks";
// Import the new hooks
import { OtpType, OtpVerifyEvent } from "@/types";

// Import necessary types

interface OtpVerificationModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  email?: string; // Email is required to request/verify OTP
  phoneNumber?: string; // Phone is optional
  otpType: OtpType; // Specify the type of OTP verification (e.g., signup, password reset)
  token?: string; // Optional token, e.g., emailVerificationToken from signup
  onVerificationSuccessAction: (data: any) => void; // Callback after successful verification
}

export const OtpVerificationModal = ({
  isOpen,
  onCloseAction,
  email,
  phoneNumber,
  otpType,
  token,
  onVerificationSuccessAction,
}: OtpVerificationModalProps) => {
  const { toast } = useToast();

  // Use the reusable verification hook
  const { isVerifying, verifyOtp } = useVerifyOtp(
    (data) => {
      // Handle success within the modal, then call the external callback
      toast({
        title: "Success",
        description: "OTP verified successfully!",
        variant: "default",
      });
      onVerificationSuccessAction(data); // Pass the response data (potentially containing action token)
      onCloseAction(); // Close the modal on success
    },
    (error) => {
      // Handle error within the modal
      //   const typedError = toTypedError(error);
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  );

  // Use the reusable request OTP hook
  const { isRequestingOtp, requestOtp } = useRequestOtp(
    () => {
      toast({
        title: "Success",
        description: "New OTP has been sent to your email",
        variant: "default",
      });
    },
    (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  );

  const form = useForm<OtpVerifyEvent>({
    resolver: zodResolver(OtpVerifyEvent),
    defaultValues: {
      otp: "",
      otpType: otpType,
      token: token || "", // Use the token passed as prop
    },
  });

  // Update form token if the prop changes (useful if token is fetched async)
  useEffect(() => {
    if (token) {
      form.setValue("token", token);
    }
  }, [token, form]);

  const onSubmit = (data: OtpVerifyEvent) => {
    // Ensure email is included in the data sent to the backend if needed by verifyOtp service
    // The OtpVerifyEvent schema doesn't currently include email, but your service might need it.
    // If your verifyOtp service needs email, you might need to adjust the schema or pass it separately.
    // For now, we'll stick to the schema definition.
    verifyOtp(data);
  };

  const handleResend = () => {
    if (email && (otpType === "sendEmailVerificationOTP" || otpType === "sendForgetPasswordOTP")) {
      requestOtp({ otpType: otpType, email: email });
    } else if (phoneNumber && otpType === "verifyPhoneNumber") {
      requestOtp({ otpType: otpType, phoneNumber: phoneNumber });
    } else {
      toast({
        title: "Error",
        description: "Contact information or OTP type is missing/invalid to resend OTP.",
        variant: "destructive",
      });
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

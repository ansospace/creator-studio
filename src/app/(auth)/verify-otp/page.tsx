"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Assuming these components exist in your ui library
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// Using the provided InputOTP component

// Placeholder API functions - Replace with your actual API calls
async function verifyOtpApi(otp: string) {
  console.log("Verifying OTP:", otp);
  // Replace with your actual API call to /otp/verify
  // Example: const response = await fetch('/api/otp/verify', { method: 'POST', body: JSON.stringify({ otp }) });
  // const data = await response.json();
  // return data; // Should return a success/failure status

  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === "123456") {
        // Simulate success for a specific OTP
        resolve({ status: "success", message: "OTP verified successfully" });
      } else {
        reject({ status: "failed", message: "Invalid OTP" });
      }
    }, 1000);
  });
}

async function resendOtpApi() {
  console.log("Resending OTP");
  // Replace with your actual API call to /otp
  // Example: const response = await fetch('/api/otp', { method: 'POST' });
  // const data = await response.json();
  // return data; // Should return a success/failure status

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "success", message: "OTP sent successfully" });
    }, 1000);
  });
}

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function VerifyOtpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setError(null);
    setIsVerifying(true);
    try {
      const result: any = await verifyOtpApi(data.otp); // Use your actual API call
      console.log({ result });
      if (result.status === "success") {
        // Redirect to dashboard on success
        router.push("/dashboard");
      } else {
        setError(result.message || "OTP verification failed.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during verification.");
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResendOtp() {
    setError(null);
    setResendMessage(null);
    setIsResending(true);
    try {
      const result: any = await resendOtpApi(); // Use your actual API call
      if (result.status === "success") {
        setResendMessage(result.message || "OTP sent successfully.");
      } else {
        setError(result.message || "Failed to resend OTP.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while resending OTP.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verify OTP</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your email.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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

              {error && <p className="text-destructive text-sm font-medium">{error}</p>}
              {resendMessage && <p className="text-sm font-medium text-green-600">{resendMessage}</p>}

              <Button type="submit" className="w-full" disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          </Form>
          <Button variant="link" className="w-full" onClick={handleResendOtp} disabled={isResending}>
            {isResending ? "Sending..." : "Resend OTP"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

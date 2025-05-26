"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { OtpVerificationModal } from "@/components/ui";
import { useToast } from "@/hooks";

import { useAuthContext } from "../AuthContext";

export default function VerifyOtpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { actionToken, email, clearActionData, otpType } = useAuthContext(); // Get data from context

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (actionToken && email) {
      setIsModalOpen(true);
    } else {
      // Redirect if token or email is missing (edge case: direct access or session expired)
      toast({
        title: "Verification Required",
        description: "Please sign up or log in to verify your email.",
        variant: "destructive",
      });
      router.replace("/login"); // Redirect to signup or login page
    }
  }, [actionToken, email, router, toast]);

  const handleVerificationSuccess = (data: any) => {
    // This callback is triggered when OTP is successfully verified via the modal
    console.log("Verification successful, received data:", data);
    clearActionData(); // Clear data from context/session storage on success
    // You might want to use the 'data' here if it contains an action token
    // and redirect the user based on the next step (e.g., dashboard, password reset form)
    router.replace("/dashboard");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Optionally redirect if the user closes the modal without verifying
    // router.replace("/signup");
  };

  // Don't render anything until we determine if we have the necessary data
  if (!actionToken || !email || !otpType) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Render the modal when open */}
      <OtpVerificationModal
        isOpen={isModalOpen}
        onCloseAction={handleModalClose}
        email={email}
        otpType={otpType}
        token={actionToken}
        onVerificationSuccessAction={handleVerificationSuccess}
      />
      {/* You might want to add some text or a spinner here while the modal is loading/open */}
      {!isModalOpen && <p>Loading verification...</p>}
    </div>
  );
}

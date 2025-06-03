"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { OtpVerificationModal } from "@/components/ui";
import { SESSION_STORAGE_KEY } from "@/constants";
import { useSessionStorage, useToast } from "@/hooks";
import { VerifyOTP } from "@/types";

export default function VerifyOtpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [actionToken, setActionData] = useSessionStorage<VerifyOTP | null>(SESSION_STORAGE_KEY.AUTH_ACTION, null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (actionToken) {
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
  }, [actionToken, router, toast]);

  const handleVerificationSuccess = (data: any) => {
    // This callback is triggered when OTP is successfully verified via the modal
    console.log("Verification successful, received data:", data);
    setActionData(null); // Clear data from context/session storage on success
    router.replace("/dashboard");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Don't render anything until we determine if we have the necessary data
  if (!actionToken) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Render the modal when open */}
      <OtpVerificationModal
        isOpen={isModalOpen}
        onCloseAction={handleModalClose}
        otpType={actionToken.otpType}
        token={actionToken.token}
        onVerificationSuccessAction={handleVerificationSuccess}
      />
      {/* You might want to add some text or a spinner here while the modal is loading/open */}
      {!isModalOpen && <p>Loading verification...</p>}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Import useState

import { OtpVerificationModal } from "@/components/ui";
// Import the reusable modal
import { OtpType } from "@/types";

// Import OtpType
import { useToast } from "../../../hooks";
import { useAuthContext } from "../AuthContext";

// Import the auth context

export default function VerifyOtpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { emailVerificationToken, email, clearEmailVerificationData } = useAuthContext(); // Get data from context

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to open the modal when token/email are available
  useEffect(() => {
    if (emailVerificationToken && email) {
      setIsModalOpen(true);
    } else {
      // Redirect if token or email is missing (edge case: direct access or session expired)
      toast({
        title: "Verification Required",
        description: "Please sign up or log in to verify your email.",
        variant: "destructive",
      });
      router.replace("/signup"); // Redirect to signup or login page
    }
  }, [emailVerificationToken, email, router, toast]);

  const handleVerificationSuccess = (data: any) => {
    // This callback is triggered when OTP is successfully verified via the modal
    console.log("Verification successful, received data:", data);
    clearEmailVerificationData(); // Clear data from context/session storage on success
    // You might want to use the 'data' here if it contains an action token
    // and redirect the user based on the next step (e.g., dashboard, password reset form)
    router.replace("/dashboard"); // Example redirect
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Optionally redirect if the user closes the modal without verifying
    // router.replace("/signup");
  };

  // Don't render anything until we determine if we have the necessary data
  if (!emailVerificationToken || !email) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Render the modal when open */}
      <OtpVerificationModal
        isOpen={isModalOpen}
        onCloseAction={handleModalClose}
        email={email}
        otpType={"sendEmailVerificationOTP" as OtpType} // Specify the OTP type for this flow
        token={emailVerificationToken} // Pass the token from context
        onVerificationSuccessAction={handleVerificationSuccess}
      />
      {/* You might want to add some text or a spinner here while the modal is loading/open */}
      {!isModalOpen && <p>Loading verification...</p>}
    </div>
  );
}

"use client";

// Assuming useSessionStorage is in hooks folder
import { ReactNode, createContext, useContext } from "react";

import useSessionStorage from "@/hooks/useSessionStorage";

import { OtpType } from "../../types";

interface AuthContextType {
  actionToken: string | null;
  email: string | null;
  setActionData: (token: string, email: string, otpType: OtpType) => void;
  clearActionData: () => void;
  otpType: OtpType | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [actionToken, setActionToken, clearToken] = useSessionStorage<string | null>(
    "ActionToken",
    "emailForVerification"
  );
  const [email, setEmail, clearEmail] = useSessionStorage<string | null>("email", null);
  const [otpType, setOtpType, clearOtpType] = useSessionStorage<OtpType | null>("otpType", null);

  const setActionData = (
    actionToken: string = "sendActionOTP",
    userEmail: string = "email",
    otpType: OtpType = "sendEmailVerificationOTP"
  ) => {
    setActionToken(actionToken);
    setEmail(userEmail);
    setOtpType(otpType);
  };

  const clearActionData = () => {
    clearToken();
    clearEmail();
    clearOtpType();
  };

  return (
    <AuthContext.Provider value={{ actionToken, email, setActionData, clearActionData, otpType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

"use client";

// Assuming useSessionStorage is in hooks folder
import { ReactNode, createContext, useContext } from "react";

import useSessionStorage from "@/hooks/useSessionStorage";

interface AuthContextType {
  emailVerificationToken: string | null;
  email: string | null;
  setEmailVerificationData: (token: string, email: string) => void;
  clearEmailVerificationData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [emailVerificationToken, setEmailVerificationToken, clearToken] = useSessionStorage<string | null>(
    "emailVerificationToken",
    null
  );
  const [email, setEmail, clearEmail] = useSessionStorage<string | null>("emailForVerification", null);

  const setEmailVerificationData = (token: string, userEmail: string) => {
    setEmailVerificationToken(token);
    setEmail(userEmail);
  };

  const clearEmailVerificationData = () => {
    clearToken();
    clearEmail();
  };

  return (
    <AuthContext.Provider
      value={{ emailVerificationToken, email, setEmailVerificationData, clearEmailVerificationData }}
    >
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

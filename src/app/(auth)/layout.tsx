import { FC, ReactNode } from "react";

import { AuthContextProvider } from "./AuthContext";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <AuthContextProvider> {children}</AuthContextProvider>;
};

export default AuthLayout;

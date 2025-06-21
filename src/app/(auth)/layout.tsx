import { FC, ReactNode } from "react";

import NavBar from "@/components/NavBar";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default AuthLayout;

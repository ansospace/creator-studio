import Image from "next/image";
import Link from "next/link";

import { Divider, SignInWithGoogle, Typography } from "@/components/ui";

import { LoginForm } from "../components";

const LoginPage = () => {
  return (
    <div className="h-vh container m-auto flex min-h-dvh w-svw items-center justify-center gap-10 p-6">
      <div className="lg:1/4 w-full sm:w-2/3 md:w-2/4 lg:w-1/3">
        <Typography variant="h2" className="border-none">
          Welcome Back
          <Typography variant="span" className="text-primary">
            &nbsp;Ansopedian!
          </Typography>
        </Typography>
        <Typography className="mt-2">Login to continue</Typography>
        <LoginForm />
        <Divider>Or</Divider>
        <SignInWithGoogle />
        <Typography className="mt-2">
          Don&apos;t have an account yet?
          <Link href="/signup" className="text-blue-500 hover:underline">
            &nbsp;Sign up
          </Link>
        </Typography>
      </div>
      <div className="hidden items-center justify-center sm:block sm:w-2/3 md:w-2/3 lg:w-1/3">
        <Image src="/images/login-illustrator.svg" alt="login" width={500} height={500} priority />
      </div>
    </div>
  );
};

export default LoginPage;

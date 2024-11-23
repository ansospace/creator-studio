import Image from "next/image";
import Link from "next/link";

import { SignUpForm } from "@/components/forms";
import { Typography } from "@/components/ui";

const LoginPage = () => {
  return (
    <div className="h-vh container m-auto flex min-h-dvh w-svw items-center justify-center gap-10 p-6">
      <div className="lg:1/4 w-full sm:w-2/3 md:w-2/4 lg:w-1/3">
        <Typography variant="h2" as="h1" className="border-none">
          Want to be an
        </Typography>
        <Typography variant="h1" className="text-primary">
          Ansopedian?
        </Typography>
        <Typography variant="p">Sign up to continue</Typography>
        <SignUpForm />
        <Typography variant="p">
          Already have an account?
          <Link href="/login" className="text-blue-500 hover:underline">
            &nbsp;Login
          </Link>
        </Typography>
      </div>
      <div className="hidden items-center justify-center sm:block sm:w-2/3 md:w-2/3 lg:w-1/3">
        <Image src="/images/sign-up-illustrator.svg" alt="login" width={500} height={500} objectFit="contain" />
      </div>
    </div>
  );
};

export default LoginPage;

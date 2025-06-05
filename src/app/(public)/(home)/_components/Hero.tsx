import Image from "next/image";

import { Button, Typography } from "@/components/ui";

export const Hero = () => {
  return (
    <section className="relative container mx-auto max-w-7xl px-4">
      {/* Main content */}
      <div className="mt-[100px] grid gap-4 py-16 md:grid-cols-2 md:gap-8">
        <div className="flex flex-col justify-center gap-4 md:gap-8">
          {/* Title */}
          <Typography variant="h1">
            The Smartest Way to Learn&nbsp;
            <Typography variant="span" className="text-primary">
              Anything
            </Typography>
          </Typography>

          {/* Description */}
          <Typography>The beautiful thing about learning is that no one can take it from you.</Typography>

          {/* Mobile Image */}
          <div className="flex items-center justify-center p-1 md:hidden">
            <Image
              src="/images/ansopedia-illustrator.svg"
              alt="illustrator"
              className="h-full max-h-[452px] w-full max-w-[640px]"
              width={640}
              height={452}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-6 lg:w-fit lg:flex-row">
            <Button className="grow">Learn More</Button>
            <Button variant="outline" className="grow">
              Get Started
            </Button>
          </div>
        </div>

        {/* Tablet/Desktop Image */}
        <div className="hidden items-center justify-center p-1 md:flex">
          <Image
            src="/images/ansopedia-illustrator.svg"
            alt="illustrator"
            className="h-full max-h-[452px] w-full max-w-[640px]"
            width={640}
            height={452}
          />
        </div>
      </div>
    </section>
  );
};

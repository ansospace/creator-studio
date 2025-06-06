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
            {/* Using width in Image */}
            <Image
              src="/images/ansopedia-illustrator.svg"
              alt="illustrator"
              width={640}
              height={452}
              priority
              className="h-auto max-w-full"
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
          {/* Using Fill */}
          <div className="relative h-[452px] w-[640px]">
            <Image src="/images/ansopedia-illustrator.svg" alt="illustrator" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </section>
  );
};

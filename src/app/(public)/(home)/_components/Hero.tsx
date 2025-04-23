import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative container mx-auto max-w-7xl px-4">
      {/* Background */}
      <div
        className="absolute top-0 right-0 -z-10 h-[424px] w-[960px] bg-cover"
        style={{ backgroundImage: "url('/assets/Hero_background.svg')" }}
      />

      {/* Main content */}
      <div className="mt-[100px] grid gap-4 py-16 md:grid-cols-2 md:gap-8">
        <div className="flex flex-col justify-center gap-4 md:gap-8">
          {/* Title */}
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            The Smartest Way to Learn <span className="text-primary">Anything</span>
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-lg">
            The beautiful thing about learning is that no one can take it from you.
          </p>

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
            <Button className="flex-grow">Learn More</Button>
            <Button variant="outline" className="flex-grow">
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

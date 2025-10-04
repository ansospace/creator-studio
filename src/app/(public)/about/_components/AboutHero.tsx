import Image from "next/image";

import { Typography } from "@/components/ui";

export const AboutHero = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-6">
          <Typography variant="h1">
            Empowering Global{" "}
            <Typography variant="span" className="text-primary">
              Education
            </Typography>
          </Typography>
          <Typography>
            We&apos;re on a mission to make quality education accessible to everyone, everywhere. Our platform connects
            learners with the best educational resources and opportunities worldwide.
          </Typography>
        </div>
        <div className="relative aspect-square md:aspect-auto md:h-[500px]">
          <Image src="/images/ansopedia-illustrator.svg" alt="About Hero" fill className="object-contain" priority />
        </div>
      </div>
    </section>
  );
};

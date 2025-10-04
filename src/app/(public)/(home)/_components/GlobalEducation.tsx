import Image from "next/image";

import { Button, Typography } from "@/components/ui";

export const GlobalEducation = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <div className="container mx-auto my-12 flex flex-col gap-10 py-18 lg:gap-0">
        <div className="grid md:grid-cols-2 md:gap-8">
          <div className="h-full w-full md:order-2">
            <Image
              src="/images/college-students.svg"
              alt="College Students"
              className="h-full w-full"
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <Typography variant="h2">
              Discover Worldwide
              <Typography className="text-primary" variant="span">
                &nbsp;Education
              </Typography>
            </Typography>
            <Typography>
              Dive into a vast database with in-depth details about educational boards, universities, schools, and
              colleges globally.
            </Typography>
            <Typography>
              Stay updated on admission procedures, curriculum details, and more, helping you make informed decisions
              about your academic journey.
            </Typography>
            <Button>Explore Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

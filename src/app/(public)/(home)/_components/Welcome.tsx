import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Typography } from "../../../../components/ui";

export const Welcome = () => {
  return (
    <div>
      {/* Light mode background */}
      <Image
        src="/images/background-wave.svg"
        alt="Background wave"
        className="flex h-full w-full dark:hidden"
        width={1920}
        height={1080}
      />
      {/* Dark mode background */}
      <Image
        src="/images/background-wave-dark.svg"
        alt="Background wave"
        className="hidden h-full w-full dark:block"
        width={1920}
        height={1080}
      />
      <section className="relative min-h-[80vh] bg-[#fff4eb] py-12 md:py-20 dark:bg-[#1e293b]">
        <div className="container mx-auto flex flex-col gap-16 px-4">
          {/* Header - Enhanced typography and spacing */}
          <div className="flex flex-col items-center justify-center gap-6">
            <Typography variant="h2">
              Welcome to{" "}
              <Typography variant="span" className="text-primary">
                Ansopedia
              </Typography>
            </Typography>
            <Typography variant="lead">
              Dive into a world of interactive quizzes, captivating content, and endless opportunities to expand your
              knowledge.
            </Typography>
          </div>

          {/* Cards - Improved layout and hover effects */}
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Exam Mastery Card */}
            <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
              <CardHeader className="flex flex-col items-center gap-4 p-6">
                <div className="bg-primary/10 dark:bg-primary/5 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                  <Image src="/icons/exam-result.svg" alt="Exam Mastery" width={48} height={48} className="h-12 w-12" />
                </div>
                <Typography variant="h3">Exam Mastery</Typography>
              </CardHeader>
              <CardContent className="text-center">
                <Typography>Unlock past exam secrets, Master your prep with years of questions & solutions</Typography>
              </CardContent>
            </Card>

            {/* Quiz Card */}
            <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
              <CardHeader className="flex flex-col items-center gap-4 p-6">
                <div className="bg-primary/10 dark:bg-primary/5 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                  <Image src="/icons/quiz.svg" alt="Quiz" width={48} height={48} className="h-12 w-12 rounded-full" />
                </div>
                <Typography variant="h3">Engaging Quiz</Typography>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6 text-center">
                <Typography>Test your knowledge and prepare for exams with our interactive quizzes.</Typography>
                <Button className="bg-primary hover:bg-primary/90 font-medium">Play Now</Button>
              </CardContent>
            </Card>

            {/* Certificate Card */}
            <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
              <CardHeader className="flex flex-col items-center gap-4 p-6">
                <div className="bg-primary/10 dark:bg-primary/5 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                  <Image
                    src="/icons/certificate.svg"
                    alt="Global Certificate"
                    width={48}
                    height={48}
                    className="h-12 w-12"
                  />
                </div>
                <Typography variant="h3">Global Certificate</Typography>
              </CardHeader>
              <CardContent className="text-center">
                <Typography>Explore pathways to global certifications and enhance your academic portfolio</Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

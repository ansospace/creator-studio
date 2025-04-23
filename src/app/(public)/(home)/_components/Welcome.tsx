import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
        className="hidden h-full w-full dark:flex"
        width={1920}
        height={1080}
      />
      <section className="relative min-h-[80vh] bg-[#fff4eb] py-16 md:py-24 dark:bg-[#1e293b]">
        <div className="container mx-auto flex flex-col gap-16 px-4">
          {/* Header - Enhanced typography and spacing */}
          <div className="flex flex-col justify-center gap-6">
            <h2 className="text-center text-5xl font-bold tracking-tight text-slate-900 md:text-6xl dark:text-slate-50">
              Welcome to{" "}
              <span className="from-primary to-primary/80 bg-gradient-to-r bg-clip-text text-transparent">
                Ansopedia
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-center text-lg text-slate-700 dark:text-slate-300">
              Dive into a world of interactive quizzes, captivating content, and endless opportunities to expand your
              knowledge.
            </p>
          </div>

          {/* Cards - Improved layout and hover effects */}
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Exam Mastery Card */}
            <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 hover:dark:border-slate-600">
              <CardHeader className="flex flex-col items-center gap-4 p-6">
                <div className="bg-primary/10 dark:bg-primary/5 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                  <Image src="/icons/exam-result.svg" alt="Exam Mastery" width={48} height={48} className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Exam Mastery</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-700 dark:text-slate-300">
                  Unlock past exam secrets, Master your prep with years of questions & solutions
                </p>
              </CardContent>
            </Card>

            {/* Quiz Card */}
            <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 hover:dark:border-slate-600">
              <CardHeader className="flex flex-col items-center gap-4 p-6">
                <div className="bg-primary/10 dark:bg-primary/5 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                  <Image src="/icons/quiz.svg" alt="Quiz" width={48} height={48} className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Engaging Quiz</h3>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6 text-center">
                <p className="text-slate-700 dark:text-slate-300">
                  Test your knowledge and prepare for exams with our interactive quizzes.
                </p>
                <Button className="bg-primary hover:bg-primary/90 font-medium">Play Now</Button>
              </CardContent>
            </Card>

            {/* Certificate Card */}
            <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 hover:dark:border-slate-600">
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
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Global Certificate</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-700 dark:text-slate-300">
                  Explore pathways to global certifications and enhance your academic portfolio
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

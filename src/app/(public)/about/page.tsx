import { AboutHero } from "./_components/AboutHero";
import { Mission } from "./_components/Mission";
import { OurTeam } from "./_components/OurTeam";
import { Stats } from "./_components/Stats";
import { Values } from "./_components/Values";

const AboutPage = () => {
  return (
    <div className="space-y-20 py-10">
      <AboutHero />
      <Mission />
      <Stats />
      <Values />
      <OurTeam />
    </div>
  );
};

export default AboutPage;

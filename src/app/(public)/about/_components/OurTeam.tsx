import Image from "next/image";

import { Card, CardContent, CardHeader, Typography } from "@/components/ui";

const team = [
  {
    name: "Sanjay Kumar Sah",
    role: "Team Lead",
    image: "https://avatars.githubusercontent.com/u/90146483?v=4",
  },
  {
    name: "Rahul Gupta",
    role: "Team Member",
    image: "https://avatars.githubusercontent.com/u/183048171?v=4",
  },
  {
    name: "Anjali Mishra",
    role: "Team Member",
    image: "https://avatars.githubusercontent.com/u/187838589?v=4",
  },
  {
    name: "Divya Nayak",
    role: "Team Member",
    image: "https://avatars.githubusercontent.com/u/185787885?v=4",
  },
];

export const OurTeam = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <Typography variant="h2" className="mb-12 text-center text-3xl font-bold">
        Meet Our Team
      </Typography>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <Card key={member.name} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardHeader>
              <Typography variant="h3" className="text-xl font-semibold">
                {member.name}
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography className="text-muted-foreground">{member.role}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

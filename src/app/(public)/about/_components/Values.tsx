import { Card, CardContent, CardHeader, Typography } from "@/components/ui";

const values = [
  {
    title: "Innovation",
    description: "Continuously evolving our platform with cutting-edge educational technology.",
  },
  {
    title: "Accessibility",
    description: "Making quality education available to everyone, everywhere.",
  },
  {
    title: "Excellence",
    description: "Maintaining high standards in all our educational content and services.",
  },
  {
    title: "Community",
    description: "Fostering a supportive global learning community.",
  },
];

export const Values = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <Typography variant="h2" className="mb-12 text-center text-3xl font-bold">
        Our Core Values
      </Typography>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <Card key={value.title} className="group transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <Typography variant="h3" className="text-xl font-semibold">
                {value.title}
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography className="text-muted-foreground">{value.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

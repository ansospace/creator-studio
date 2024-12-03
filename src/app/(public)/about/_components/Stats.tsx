import { Card, CardContent, Typography } from "@/components/ui";

const stats = [
  { label: "Active Students", value: "50K+" },
  { label: "Courses", value: "1000+" },
  { label: "Countries", value: "150+" },
  { label: "Success Rate", value: "95%" },
];

export const Stats = () => {
  return (
    <section className="bg-primary/5 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none bg-transparent text-center">
              <CardContent className="p-6">
                <Typography className="text-3xl font-bold text-primary">{stat.value}</Typography>
                <Typography className="mt-2 text-sm text-muted-foreground">{stat.label}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

import { Card, CardContent, CardHeader, Typography } from "@/components/ui";

export const Mission = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <div className="text-center">
        <Typography variant="h2" className="mb-4 text-3xl font-bold">
          Our Mission & Vision
        </Typography>
        <Typography className="mx-auto max-w-2xl text-muted-foreground">
          We strive to break down barriers in education and create a world where quality learning is accessible to all,
          regardless of geographical or economic constraints.
        </Typography>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card className="group transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <Typography variant="h3" className="text-xl font-semibold">
              Our Mission
            </Typography>
          </CardHeader>
          <CardContent>
            <Typography className="text-muted-foreground">
              To democratize education by providing accessible, high-quality learning resources and connecting students
              with global educational opportunities.
            </Typography>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <Typography variant="h3" className="text-xl font-semibold">
              Our Vision
            </Typography>
          </CardHeader>
          <CardContent>
            <Typography className="text-muted-foreground">
              A world where every individual has equal access to quality education and the opportunity to reach their
              full potential.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

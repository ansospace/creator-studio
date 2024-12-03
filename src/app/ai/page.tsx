import { AIFeatures } from "../../components/AIFeatures";
import { Typography } from "../../components/ui/typography";

const page = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <Typography variant="h1">AI Features</Typography>
      <AIFeatures />
    </div>
  );
};

export default page;

import Link from "next/link";

import { Separator, Typography } from "./ui";

const CopyrightFooter = () => {
  return (
    <div className="container mx-auto">
      <Separator />
      <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <Typography className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Ansopedia. All rights reserved.
        </Typography>
        <div className="flex gap-4">
          <Link href="#" className="text-muted-foreground hover:text-primary text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary text-sm hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CopyrightFooter;

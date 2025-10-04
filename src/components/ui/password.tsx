"use client";

import { useState } from "react";

import { Eye, EyeClosed } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Button } from "./button";

const Password = ({ className, ...props }: React.ComponentProps<"input">) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <div className={cn("relative w-full cursor-pointer", className)}>
      <Input {...props} type={visible ? "text" : "password"} />
      <Button
        size="icon"
        variant={"ghost"}
        onClick={toggleVisible}
        className="absolute top-1/2 right-0 -translate-y-1/2"
      >
        {visible ? <EyeClosed /> : <Eye />}
      </Button>
    </div>
  );
};

export { Password };

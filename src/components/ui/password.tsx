"use client";

import { forwardRef, useState } from "react";

import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { Input, InputProps } from "@/components/ui/input";

const Password = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!visible);

  return (
    <div className="relative">
      <Input {...props} ref={ref} type={visible ? "text" : "password"} />
      <div
        className="absolute bottom-2 right-5"
        onClick={toggleVisible}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleVisible();
        }}
      >
        {visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </div>
    </div>
  );
});
Password.displayName = "Password";

export { Password };

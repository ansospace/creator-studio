"use client";

import { Path } from "react-hook-form";

import { FormGenerator, Loader } from "@/components/global";
import { Button, Checkbox } from "@/components/ui";
import { LOGIN_FORM_FIELDS } from "@/constants";
import { useLogin } from "@/hooks";
import { LoginSchema } from "@/types/auth";

export const LoginForm = () => {
  const { isPending, handleSubmit, register, errors, onSubmit } = useLogin();

  return (
    <form className="mt-10 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {LOGIN_FORM_FIELDS.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          inputType={field.inputType}
          register={register}
          errors={errors}
          name={field.name as Path<LoginSchema>}
          value={field.value}
        />
      ))}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" {...register("rememberMe", { setValueAs: (value) => value === "on" })} />
          <label
            htmlFor="remember-me"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <a href="#" className="text-blue-500 hover:underline">
          Forget password?
        </a>
      </div>
      <Button type="submit" className="rounded-2xl" disabled={isPending}>
        <Loader loading={isPending}>Log In</Loader>
      </Button>
    </form>
  );
};

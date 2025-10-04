"use client";

import { Path } from "react-hook-form";

import { FormGenerator, Loader } from "@/components/global";
import { Button } from "@/components/ui";
import { SIGNUP_FORM_FIELDS } from "@/constants";
import { SignUpSchema } from "@/types/auth";

import { useSignUp } from "../hooks/useSignUp";

export const SignUpForm = () => {
  const { isPending, handleSubmit, register, errors, onSubmit } = useSignUp();

  return (
    <form className="mt-10 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {SIGNUP_FORM_FIELDS.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
          name={field.name as Path<SignUpSchema>}
          value={field.value}
        />
      ))}
      <Button type="submit" className="rounded-2xl" disabled={isPending}>
        <Loader loading={isPending}>Sign Up</Loader>
      </Button>
    </form>
  );
};

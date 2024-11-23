import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

import { Input, Label, Password, Textarea } from "@/components/ui";

type InputType = "select" | "input" | "textarea" | "password";
type InputTypeProps = {
  select: { options: { value: string; label: string; id: string }[] };
  input: { type: "text" | "email" | "password" | "number" };
  textarea: { lines: number };
  password: { type: "text" | "email" | "password" | "number" };
};

type FormGeneratorProps<T extends InputType, F extends FieldValues> = {
  inputType: T;
  label?: string;
  placeholder: string;
  register: UseFormRegister<F>;
  name: Path<F>;
  errors: FieldErrors<F>;
  value?: string;
} & InputTypeProps[T];

const ErrorMessageComponent = ({ errors, name }: { errors: FieldErrors<FieldValues>; name: string }) => (
  <ErrorMessage
    errors={errors}
    name={name}
    render={({ message }) => <p className="mt-2 text-red-400">{message === "Required" ? "" : message}</p>}
  />
);

export const FormGenerator = <T extends InputType, F extends FieldValues>(props: FormGeneratorProps<T, F>) => {
  const { inputType, label, placeholder, register, name, errors, value } = props;

  const commonProps = {
    id: `${inputType}-${label}`,
    placeholder,
    value,
    ...register(name), // Cast name to keyof F
  };

  const renderInput = () => (
    <Input
      type={(props as InputTypeProps["input"]).type}
      className="bg-themeBlack border-themeGray text-themeTextGray"
      {...commonProps}
    />
  );

  const renderSelect = () => (
    <select className="w-full rounded-lg border-[1px] bg-transparent p-3" {...commonProps}>
      {(props as InputTypeProps["select"]).options?.map((option) => (
        <option value={option.value} key={option.id} className="dark:bg-muted">
          {option.label}
        </option>
      ))}
    </select>
  );

  const renderTextarea = () => (
    <Textarea
      className="bg-themeBlack border-themeGray text-themeTextGray"
      rows={(props as InputTypeProps["textarea"]).lines}
      {...commonProps}
    />
  );

  const renderPassword = () => (
    <Password
      type={(props as InputTypeProps["input"]).type}
      className="bg-themeBlack border-themeGray text-themeTextGray"
      {...commonProps}
    />
  );

  const inputComponents = {
    input: renderInput(),
    select: renderSelect(),
    textarea: renderTextarea(),
    password: renderPassword(),
  };

  const InputComponent = inputComponents[inputType];

  return InputComponent ? (
    <Label className="flex flex-col gap-2" htmlFor={commonProps.id}>
      {label && label}
      {InputComponent}
      <ErrorMessageComponent errors={errors} name={name} />
    </Label>
  ) : null;
};

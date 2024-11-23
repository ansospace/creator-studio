export type FormFieldConfig = {
  id: string;
  type: "email" | "text" | "password";
  inputType: "select" | "input" | "password";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
  value?: string;
};

export const SIGNUP_FORM_FIELDS: FormFieldConfig[] = [
  {
    id: "signup_username",
    inputType: "input",
    placeholder: "Create an unique username",
    name: "username",
    type: "text",
  },
  {
    id: "signup_email",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "signup_password",
    inputType: "password",
    placeholder: "Create a password",
    name: "password",
    type: "password",
  },
  {
    id: "signup_confirm_password",
    inputType: "password",
    placeholder: "Confirm password",
    name: "confirmPassword",
    type: "password",
  },
];

export const LOGIN_FORM_FIELDS: FormFieldConfig[] = [
  {
    id: "login_email",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "login_password",
    inputType: "password",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

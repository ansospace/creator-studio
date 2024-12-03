import { FieldValues } from "react-hook-form";

export interface FormFieldConfig extends FieldValues {
  id: string;
  type: "email" | "text" | "password" | "url" | "number";
  inputType: "select" | "input" | "password" | "textarea";
  options?: readonly { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
  value?: string;
}

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
    value: "sanjay8797421521@gmail.com",
  },
  {
    id: "login_password",
    inputType: "password",
    placeholder: "Password",
    name: "password",
    type: "password",
    value: "Sanjay@8797421521",
  },
];

export const PROFILE_FORM_FIELDS: FormFieldConfig[] = [
  {
    id: "profile_bio",
    inputType: "textarea",
    label: "Bio",
    placeholder: "Tell us about yourself",
    name: "bio",
    lines: 4,
    type: "text",
  },
  {
    id: "profile_phone",
    inputType: "input",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    name: "phoneNumber",
    type: "text",
  },
  {
    id: "profile_street",
    inputType: "input",
    label: "Street",
    placeholder: "Enter street address",
    name: "address.street",
    type: "text",
  },
  {
    id: "profile_city",
    inputType: "input",
    label: "City",
    placeholder: "Enter city",
    name: "address.city",
    type: "text",
  },
  {
    id: "profile_country",
    inputType: "input",
    label: "Country",
    placeholder: "Enter country",
    name: "address.country",
    type: "text",
  },
  {
    id: "profile_zipcode",
    inputType: "input",
    label: "Zip Code",
    placeholder: "Enter zip code",
    name: "address.zipCode",
    type: "text",
  },
  {
    id: "profile_twitter",
    inputType: "input",
    label: "Twitter",
    placeholder: "Enter Twitter URL",
    name: "socialLinks.twitter",
    type: "url",
  },
  {
    id: "profile_linkedin",
    inputType: "input",
    label: "LinkedIn",
    placeholder: "Enter LinkedIn URL",
    name: "socialLinks.linkedin",
    type: "url",
  },
  {
    id: "profile_github",
    inputType: "input",
    label: "GitHub",
    placeholder: "Enter GitHub URL",
    name: "socialLinks.github",
    type: "url",
  },
];

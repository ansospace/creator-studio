import { ZodIssue } from "zod";

type IApiResponseSuccess<T> = {
  status: "success";
  message: string;
} & (T extends void ? { readonly data?: never } : { data: T });

interface IApiResponseFailed {
  status: "failed";
  message: string;
  code: string;
  errors?: ZodIssue[];
}

export type IApiResponse<T = void> = IApiResponseSuccess<T> | IApiResponseFailed;

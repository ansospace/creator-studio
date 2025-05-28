import { ZodIssue } from "zod";

interface IApiResponseSuccess<T> {
  status: "success";
  message: string;
  data: T extends undefined ? never : T;
}

interface IApiResponseFailed {
  status: "failed";
  message: string;
  code: string;
  errors?: ZodIssue[];
}

export type IApiResponse<T> = IApiResponseSuccess<T> | IApiResponseFailed;

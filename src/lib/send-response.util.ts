import { ZodIssue } from "zod";

interface IApiResponse<T = undefined> {
  status: "success" | "failed";
  message: string;
  code?: string;
  data?: T;
  errors?: ZodIssue[];
}

export const apiResponse = <T>({ status, message, data, code, errors }: IApiResponse<T>): IApiResponse<T> => {
  const responseBody: IApiResponse<T> = {
    status,
    message,
    data,
    code,
    errors,
  };

  return responseBody;
};

export type ApiResponse<T = undefined> = ReturnType<typeof apiResponse<T>>;

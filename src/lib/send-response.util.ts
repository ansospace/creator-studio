interface IApiResponse<T = undefined> {
  status?: "success" | "failed";
  message: string;
  data?: T;
}

export const apiResponse = <T>(data: IApiResponse<T>): IApiResponse<T> => {
  const { message } = data;
  const responseBody: IApiResponse<T> = { message };

  Object.assign(responseBody, data);
  return responseBody;
};

export type ApiResponse<T = undefined> = ReturnType<typeof apiResponse<T>>;

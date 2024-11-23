export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public errors?: unknown[]
  ) {
    super(message);
    this.name = "ApiError";
  }
}

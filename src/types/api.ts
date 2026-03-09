export type ApiErrorCode = 401 | 403 | 404 | 500;

export interface ApiError {
  code: ApiErrorCode;
  message: string;
}

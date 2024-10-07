export interface IErrorResponse {
  statusCode: number;
  message: string;
  timestamp?: string;
  traceId?: string;
  description?: string;
  error?: string;
}

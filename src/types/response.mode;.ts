export interface ResultSuccessResponse<T> {
  data: T;
  message: string;
  isSuccess: boolean;
  statusCode: number;
}

export interface ResultErrorResponse {
  message: string;
  isSuccess: false;
  statusCode: number;
}








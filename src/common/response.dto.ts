export class ResponseDto<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;

  constructor(success: boolean, statusCode: number, message: string, data: T) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data ? data : ({} as T);
  }
}

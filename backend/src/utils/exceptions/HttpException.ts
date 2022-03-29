export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpException.prototype);

    this.status = status;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

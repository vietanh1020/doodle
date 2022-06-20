export class ErrorDto {
  public error: string = "";
  public message: string = "";
  public data: any = null;

  constructor(obj: Partial<ErrorDto>) {
    Object.assign(this, obj);
  }
}

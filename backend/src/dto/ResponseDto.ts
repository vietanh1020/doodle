export class ResponseDto {
  public error: string = "";
  public message: string = "";
  public data: any = null;

  constructor(obj: Partial<ResponseDto>) {
    Object.assign(this, obj);
  }
}

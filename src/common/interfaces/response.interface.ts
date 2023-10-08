// 接口统一返回值 code, message, data
export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface IHttpClient {
  post<T>(url: string, body: any): Promise<T>;
}

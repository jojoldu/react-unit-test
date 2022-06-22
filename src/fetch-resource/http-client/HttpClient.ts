export interface HttpClient {
  get(url: string, options: any): any;
  post(url: string, options: any, data: any): any;
}

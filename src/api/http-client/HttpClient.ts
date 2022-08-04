export default interface HttpClient {
  get(url: string, options?: any): Promise<any>;
  post(url: string, data?: any, options?: any): Promise<any>;
}

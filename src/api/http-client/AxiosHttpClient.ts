import HttpClient from './HttpClient';
import { axiosApi } from '../axiosApi';
import { injectable } from 'tsyringe';

@injectable()
export default class AxiosHttpClient implements HttpClient {
  async get(url: string, options?: any): Promise<any> {
    return axiosApi.get(url, options);
  }

  async post(url: string, data?: any, options?: any): Promise<any> {
    return axiosApi.post(url, data, options);
  }
}

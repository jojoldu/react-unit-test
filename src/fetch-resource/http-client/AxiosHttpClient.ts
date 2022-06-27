import HttpClient from './HttpClient';
import { axiosApi } from '../axiosApi';
import { injectable } from 'tsyringe';

@injectable()
export default class AxiosHttpClient implements HttpClient {
  get(url: string, options: any): any {
    return axiosApi.get(url);
  }

  post(url: string, options: any, data: any): any {
    return axiosApi.post(url, data);
  }
}

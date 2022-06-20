import { database } from './apiServer';

export type axiosResponse = {
  data: any
}

function createAxiosInstance() {
  return {
    get: (url: string): Promise<axiosResponse> =>
      new Promise((resolve) =>
        resolve({
          data: Object.assign([], database)
        })),

    post: (url: string, requestBody: any): Promise<axiosResponse> => {
      if(!requestBody?.id) {
        throw new Error('id가 비어있습니다.');
      }
      database.push(requestBody);

      return new Promise((resolve) =>
        resolve({
          data: Object.assign([], requestBody)
        }));
    }
  }
}

export const axiosApi = createAxiosInstance();

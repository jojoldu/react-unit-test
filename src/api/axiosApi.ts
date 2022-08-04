import { database } from './apiServer';

export type axiosResponse = {
  data: any;
};

function createAxiosInstance() {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get: async (url: string, options: any): Promise<axiosResponse> =>
      new Promise((resolve) => {
        // eslint-disable-next-line no-console
        console.log(`get url: ${url}, options: ${options}`);
        resolve({
          data: Object.assign([], database),
        });
      }),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    post: async (url: string, requestBody: any, options: any): Promise<axiosResponse> => {
      // eslint-disable-next-line no-console
      console.log(`post url: ${url}, options: ${options}`);
      if (!requestBody?.id) {
        throw new Error('id가 비어있습니다.');
      }
      database.push(requestBody);

      return new Promise((resolve) =>
        // eslint-disable-next-line no-promise-executor-return
        resolve({
          data: Object.assign([], requestBody),
        }),
      );
    },
  };
}

export const axiosApi = createAxiosInstance();

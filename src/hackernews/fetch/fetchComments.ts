import { axiosApi } from '../../fetch-resource/axiosApi';

export default async function fetchComments() {
  /**
   * B 로직
   */
  const {data} = await axiosApi.get('/comments');
  return data;
}

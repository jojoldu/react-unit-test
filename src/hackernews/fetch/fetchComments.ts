import { axiosApi } from '../../fetch-resource/axiosApi';

export default async function fetchComments() {
  const {data} = await axiosApi.get('/comments');
  return data;
}

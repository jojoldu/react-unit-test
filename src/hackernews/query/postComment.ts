import { axiosApi } from '../../fetch-resource/axiosApi';

export default async function postComment(req: object) {
  const {data} = await axiosApi.post('/comment', req);
  return data;
}

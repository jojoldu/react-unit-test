import { container } from 'tsyringe';
import AxiosHttpClient from '../../fetch-resource/http-client/AxiosHttpClient';

export default async function fetchComments() {
  const api = container.resolve(AxiosHttpClient);
  const {data} = await api.get('/comments');
  return data;
}

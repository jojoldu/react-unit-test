import { api } from '../../fetch-resource/axiosApi';

export default async function fetchComment() {
  const {data} = await api.get('https://hacker-news.firebaseio.com/v0/item/2921983.json');
  return data;
}

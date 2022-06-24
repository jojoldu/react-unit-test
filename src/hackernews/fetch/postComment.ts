import { axiosApi } from '../../fetch-resource/axiosApi';
import { Comment } from '../Comment';


export default async function postComment(req: Comment) {
  const comment = {
    id: req.id,
    name: `이름${req.id}`,
  }
  const {data} = await axiosApi.post('/comment', comment);
  return data;
}



import { axiosApi } from '../../fetch-resource/axiosApi';
import { Comment } from '../Comment';
import { privateDecrypt } from 'crypto';
import { Container } from 'typedi';

function setModel(req: Comment) {
  const comment = {
    id: req.id,
    name: `이름${req.id}`,
  }
  return comment;
}

@Service()
class {

}

Container.set(StubApi());

export default async function postComment(req: Comment) {
  const api = Container.get(httpApi);
  const comment = setModel(req);
  validate(comment);
  validate2(comment);

  const {data} = await api.post('/comment', comment);
  return data;
}

private function validate(comment) {
}



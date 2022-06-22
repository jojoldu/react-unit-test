import { useQuery } from 'react-query';
import fetchComments from './fetchComments';
import { Comment } from '../Comment';

export default function useFetchComments() {
  /*
     A 로직
   */
  return useQuery<Array<Comment>, Error>('comments', fetchComments);
}

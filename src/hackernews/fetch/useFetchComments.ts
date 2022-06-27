import { useQuery } from 'react-query';
import fetchComments from './fetchComments';
import { Comment } from '../Comment';

export default function useFetchComments() {
  return useQuery<Array<Comment>, Error>('comments', fetchComments);
}

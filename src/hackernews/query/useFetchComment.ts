import { useQuery } from 'react-query';
import fetchComment from './fetchComment';
import { Comment } from '../Comment';

export default function useFetchComment() {
  return useQuery<Comment, Error>('comment', fetchComment);
}

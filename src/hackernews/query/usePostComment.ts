import { useQuery } from 'react-query';
import fetchComments from './fetchComments';
import { Comment } from '../Comment';

export default function usePostComment() {
  return useQuery<Comment, Error>('comment', fetchComments);
}

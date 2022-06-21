import { useMutation, useQueryClient } from 'react-query';
import { Comment } from '../Comment';
import postComment from './postComment';

export default function usePostComment() {
  const queryClient = useQueryClient();

  return useMutation((data: Comment) => postComment(data), {
    onMutate: (data: Comment) => {
      const beforeComments = queryClient.getQueryData('users');
      queryClient.setQueryData('comments', (before: any) => {
        return [...before, data];
      });

      return beforeComments;
    },
    onSuccess: () => {
      console.log(`사용자추가`)
    },
  });
}

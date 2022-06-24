import { QueryClient, useMutation } from 'react-query';
import { Comment } from '../Comment';
import postComment from './postComment';

// eslint-disable-next-line react-hooks/rules-of-hooks
export default function usePostComment(queryClient:QueryClient) {

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


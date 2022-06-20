import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useFetchComments from './query/useFetchComments';
import postComment from './query/postComment';
import { Comment } from './Comment';

export default function CommentComponent() {
  const queryClient = useQueryClient();
  const query = useFetchComments();
  const comments = query.data;

  const mutation = useMutation((data: Comment) => postComment(data), {
    onMutate: (data: Comment) => {
      const previousValue = queryClient.getQueryData('users');
      console.log('previousValue', data);
      queryClient.setQueryData('comments', (old: any) => {
        console.log('old', old);
        return [...old, data];
      });

      return previousValue;
    },
    onSuccess: () => {
      console.log(`사용자추가`)
    },
  });

  const handleClick = useCallback(
    (data:any) => {
      mutation.mutate(data);
    },
    [mutation],
  );

  return (
    <div>
      <p>Hello</p>
      <ul>
      {
        comments?.map((comment) => (
          <li key={comment?.id}>{comment.id} by {comment.name}</li>
        ))
      }
      </ul>
      <button onClick={() => handleClick({id: create()})}>코멘트 추가</button>
    </div>
  )
}

export function create(): number {
  const max = 99;
  const min = 1;
  return Math.floor(Math.random() * (max - min) + min);
}

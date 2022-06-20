import { useCallback } from 'react';
import { useMutation } from 'react-query';
import useFetchComments from './query/useFetchComments';
import { Comment } from './Comment';
import postComment from './query/postComment';

export default function CommentComponent() {
  const query = useFetchComments();
  const comments = query.data;

  const comment: Comment = {
    id: create()
  }

  const mutation = useMutation((data: object) => postComment(data), {
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
          <li key={comment?.id}>commentId: {comment.id}</li>
        ))
      }
      </ul>
      <button onClick={() => handleClick}>코멘트 추가</button>
    </div>
  )
}


export function create(): number {
  const max = 99;
  const min = 1;
  return Math.random() * (max - min) + min;
}

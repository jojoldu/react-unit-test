import { useCallback } from 'react';
import useFetchComments from './fetch/useFetchComments';
import usePostComment from './fetch/usePostComment';
import { QueryClient } from 'react-query';

export default function CommentComponent({ client }: {client:QueryClient}) {
  const query = useFetchComments();
  const mutation = usePostComment(client);

  const handleClick = useCallback(
    (data:any) => {
      mutation.mutate(data);
    },
    [mutation],
  );

  const comments = query.data;
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

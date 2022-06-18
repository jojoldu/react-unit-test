import useFetchComment from './query/useFetchComment';

export default function CommentComponent() {
  const query = useFetchComment();
  const comment = query.data
  return (
    <div>
      <p>Hello</p>

      <p>{comment?.time}</p>
      <p>{comment?.by}</p>
      <p>{comment?.id}</p>
    </div>
  )
}

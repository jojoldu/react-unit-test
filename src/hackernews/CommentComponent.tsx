import useFetchComments from './query/useFetchComments';

export default function CommentComponent() {
  const query = useFetchComments();
  const comments = query.data
  return (
    <div>
      <p>Hello</p>
      {
        comments?.map((comment) => (
          <li key={comment?.id}>{comment.id}</li>
        ))
      }
    </div>
  )
}

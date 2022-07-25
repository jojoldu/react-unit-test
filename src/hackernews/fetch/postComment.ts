import { axiosApi } from '../../api/axiosApi';
import { Comment } from '../Comment';
import { container } from "tsyringe";
import CommentService from "./CommentService";

export default async function postComment(req: Comment) {
/*  const comment = {
    id: req.id,
    name: `이름${req.id}`,
  }

  const {data} = await axiosApi.post('/comment', comment);
  return data;*/

  const commentService = container.resolve(CommentService);
  return commentService.postComment(req);
}

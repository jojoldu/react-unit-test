import { container } from 'tsyringe';
import CommentService from "./CommentService";
import AxiosHttpClient from "../../fetch-resource/http-client/AxiosHttpClient";

export default async function fetchComments() {
/*  const api = container.resolve(AxiosHttpClient);
  return api.get('/comments');*/

  const commentService = container.resolve(CommentService);
  return commentService.fetchComments();
}

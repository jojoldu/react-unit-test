import { inject, injectable } from "tsyringe";
import type HttpClient from "../../fetch-resource/http-client/HttpClient";
import { Comment } from "../Comment";

@injectable()
export default class CommentService {
  constructor(@inject("HttpClient") private httpClient: HttpClient) {}

  async fetchComments() {
    const {data} = await this.httpClient.get('/comments');
    return data;
  }

  async postComment(req: Comment) {
    const comment = {
      id: req.id,
      name: `이름${req.id}`,
    }
    const {data} = await this.httpClient.post('/comment', comment);
    return data;
  }
}
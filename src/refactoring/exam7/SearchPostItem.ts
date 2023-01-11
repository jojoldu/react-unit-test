import { Type } from 'class-transformer';

import { SearchWriter } from './SearchWriter';

export class SearchPostItem {
  id: number;
  courseId?: number;
  unitId?: number;
  title?: string;
  slug?: string;
  body?: string;
  status?: string;
  isSpam: boolean;
  commentCount: number;
  recommendedCount: number;
  viewCount: number;
  bookmarkCount: number;
  @Type(() => SearchWriter)
  writer?: SearchWriter;
  tags: string[];

  static of(post: any, viewCount: number, tags: string[]) {
    const item = new SearchPostItem();

    item.id = post.id;
    item.courseId = post.course?.id;
    item.unitId = post.unit?.id;
    item.title = post.title;
    item.slug = post.slug;
    item.body = post.content();
    item.status = post.status?.code;
    item.isSpam = post.isSpam;
    item.commentCount = post.commentCount;
    item.recommendedCount = post.recommendedCount;
    item.bookmarkCount = post.bookmarkCount;
    item.viewCount = viewCount;
    item.tags = tags;

    const user = post?.getUser();

    if (user) {
      const writer = new SearchWriter();
      writer.id = user.id;
      writer.name = user.name;
      writer.isAdmin = user.isAdmin;
      item.writer = writer;
    }

    return item;
  }
}

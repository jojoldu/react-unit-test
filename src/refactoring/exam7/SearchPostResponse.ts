import { Type } from 'class-transformer';

import { SearchPostItem } from './SearchPostItem';

export class SearchPostResponse {
  @Type(() => SearchPostItem)
  items: SearchPostItem[];
  totalCount: number;

  static of(items: SearchPostItem[], totalCount: number): SearchPostResponse {
    const response = new SearchPostResponse();
    response.items = items;
    response.totalCount = totalCount;

    return response;
  }
}

import { Tag } from '../../Post';
import { filterEnter } from '../../filterEnter';
import { filterParagraphTag } from '../../filterParagraphTag';

export function getPost(title: string, tags: Tag[], tag: string, body: any) {
  const parsedTitle = filterEnter(title).trim();
  const parsedTags = tags.map(({ tagName }) => tagName);
  const parsedTag = tag.trim();
  const parsedBody = filterParagraphTag(body);
  return { parsedTitle, parsedTags, parsedTag, parsedBody };
}

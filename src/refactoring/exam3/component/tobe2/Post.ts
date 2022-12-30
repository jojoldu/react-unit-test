import { PostMetaType, TagType } from '../../PostType';
import { filterEnter } from '../../filterEnter';
import { filterParagraphTag } from '../../filterParagraphTag';

export class Post {
  private readonly _tag: string;
  private readonly _tags: string[];
  private readonly _title: string;
  private readonly _body: string;

  constructor(tag: string, tags: TagType[], title: string, body: string) {
    this._tag = tag.trim();
    this._tags = tags.map(({ tagName }) => tagName);
    this._title = filterEnter(title).trim();
    this._body = filterParagraphTag(body);
  }

  static of(postMeta: PostMetaType, body: string): Post {
    return new Post(postMeta.tag, postMeta.tags, postMeta.title, body);
  }

  isFilledPost() {
    return (
      this._title !== '' ||
      this._tags.length !== 0 ||
      this._tag !== '' ||
      this._body !== ''
    );
  }
}

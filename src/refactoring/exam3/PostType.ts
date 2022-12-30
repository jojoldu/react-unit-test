export type PostType = {
  tag: string;
  tags: TagType[];
  title: string;
  body: string;
};

export type PostMetaType = {
  tag: string;
  tags: TagType[];
  title: string;
};

export type TagType = {
  tagName: string;
};

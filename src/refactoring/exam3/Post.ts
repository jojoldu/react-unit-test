export type Post = {
  tag: string;
  tags: Tag[];
  title: string;
  body: string;
};

export type PostMeta = {
  tag: string;
  tags: Tag[];
  title: string;
};

export type Tag = {
  tagName: string;
};

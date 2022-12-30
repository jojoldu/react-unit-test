import { PostMetaType } from './PostType';

export function getValues(): PostMetaType {
  return {
    tag: '',
    tags: [{ tagName: '' }],
    title: '',
  };
}

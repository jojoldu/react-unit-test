import { PostMeta } from './Post';

export function getValues(): PostMeta {
  return {
    tag: '',
    tags: [{ tagName: '' }],
    title: '',
  };
}

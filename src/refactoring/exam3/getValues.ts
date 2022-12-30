import { Post } from './Post';

export function getValues(): Post {
  return {
    tag: '',
    tags: [{ tagName: '' }],
    title: '',
  };
}

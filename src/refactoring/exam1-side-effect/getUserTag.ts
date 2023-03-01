import { Tag } from './tag';

export async function getUserTag(): Promise<Tag> {
  const response = await fetch('/api/user/tagName');
  return response.json();
}

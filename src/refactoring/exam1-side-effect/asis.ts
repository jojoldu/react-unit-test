import { showNotification } from './showNotification';

export async function notifyTag(fields: []): Promise<void> {
  const response: Response = await fetch('/api/user/tagName');
  // @ts-ignore
  const { userTagName } = response.json();

  if (fields.find(({ tagName: tagName }) => tagName === userTagName)) {
    showNotification(userTagName);

    return;
  }
}

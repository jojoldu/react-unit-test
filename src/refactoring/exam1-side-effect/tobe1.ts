import { showNotification } from './showNotification';
import { Field } from './tag';
import { getUserTag } from './getUserTag';

export async function notifyTag(fields: Field[]): Promise<void> {
  const { name: userTagName, count } = await getUserTag();

  if (hasTagName(fields, userTagName)) {
    showNotification(getTagCountMessage(userTagName, count));
  } else {
    showNotification(getEmptyMessage(userTagName));
  }
}

function hasTagName(fields: Field[], userTagName: string) {
  return fields.find((field) => field.tagName === userTagName);
}

function getTagCountMessage(userTagName: string, count: number) {
  return `${userTagName}의 개수는 ${count} 입니다.`;
}

function getEmptyMessage(userTagName: string) {
  return `${userTagName} 에 관련된 태그가 존재하지 않습니다.`;
}

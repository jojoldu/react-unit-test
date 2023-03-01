import { showNotification } from './showNotification';
import { Field, Tag } from './tag';
import { getUserTag } from './getUserTag';

function getTagMessage(fields: Field[], tag: Tag) {
  const userField = fields.find((field) => field.tagName === tag.name);
  return userField
    ? `${tag.name}의 개수는 ${tag.count} 입니다.`
    : `${tag.name} 에 관련된 태그가 존재하지 않습니다.`;
}

export async function notifyTag(fields: Field[]): Promise<void> {
  const tag: Tag = await getUserTag();
  const tagMessage = getTagMessage(fields, tag);
  showNotification(tagMessage);
}

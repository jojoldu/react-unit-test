import { showNotification } from './showNotification';
import { Field } from './tag';
import { getUserTag } from './getUserTag';

export async function notifyTag(fields: Field[]): Promise<void> {
  const { name: userTagName, count } = await getUserTag();

  if (fields.find((field) => field.tagName === userTagName)) {
    showNotification(`${userTagName}의 개수는 ${count} 입니다.`);
  } else {
    showNotification(`${userTagName} 에 관련된 태그가 존재하지 않습니다.`);
  }
}

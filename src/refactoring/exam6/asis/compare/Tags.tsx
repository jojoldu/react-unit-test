import { KeyboardEventHandler, useCallback } from 'react';

export default function Tags() {
  const { showNotification } = useShowNotification();
  const { register, control, setValue } = useFormContext<PostInputs>();
  const tagName = useWatch({ name: 'tag', control });
  const { fields, append, remove } = useFieldArray({ name: 'tags', control });

  const handleKeypress: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        // 꺾쇠, 콤마, 스페이스, 한글 단음 제거
        const parsedTagName = filterSpace(tagName.replace(/[ㄱ-ㅎ]|[ㅏ-ㅣ]/g, '')).trim();

        // 비어 있으면 패스
        if (parsedTagName.length === 0) {
          showNotification({
            id: 'emptyTag',
            title: '태그를 입력해주세요.',
            type: 'error',
          });

          return;
        }

        // 기존에 존재하지 않는 태그만 추가
        if (fields.find(({ tagName: tempTagName }) => tempTagName === parsedTagName)) {
          showNotification();

          return;
        }

        // 글자 수 초과
        if (parsedTagName.length > 20) {
          showNotification();

          return;
        }

        // 태그 수 초과
        if (fields.length >= 10) {
          showNotification();
          return;
        }

        append({ tagName: parsedTagName });
        setValue('tag', '');
      }
    },
    [tagName, fields]
  );

  const handleRemoveTag: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Backspace' && fields.length !== 0 && tagName.length === 0) {
        const lastTagIndex = fields.length - 1;

        remove(lastTagIndex);
      }
    },
    [tagName, fields]
  );



  return (
    <div>
      <ul>
      </ul>
    </div>
  );
}


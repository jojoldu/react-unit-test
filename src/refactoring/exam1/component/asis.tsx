/* eslint-disable @typescript-eslint/no-unused-vars,no-console,@typescript-eslint/ban-ts-comment */

import { useCallback, useRef } from 'react';
import { getValues } from '../getValues';
import { filterEnter } from '../filterEnter';
import { filterParagraphTag } from '../filterParagraphTag';
import { EditorFeature } from '../EditorFeature';

const handleOpenModal = () => console.log('open');
const goBackPage = useCallback(() => {}, []);

export const handleCancel = useCallback(() => {
  const editorRef = useRef<EditorFeature | null>(null);
  if (!editorRef || !editorRef.current) {
    return;
  }
  const { title, tags, tag } = getValues(); // 외부에서 값을 가져오는 함수

  const parsedTitle = filterEnter(title).trim();
  const parsedTags = tags.map(({ tagName }) => tagName);
  const parsedTag = tag.trim();
  const parsedBody = filterParagraphTag(editorRef.current.getContent());

  if (
    parsedTitle !== '' ||
    parsedTags.length !== 0 ||
    parsedTag !== '' ||
    parsedBody !== ''
  ) {
    handleOpenModal();

    return;
  }

  goBackPage();
}, []);

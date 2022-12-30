/* eslint-disable @typescript-eslint/no-unused-vars,no-console,@typescript-eslint/ban-ts-comment */

import { useCallback, useRef } from 'react';
import { getValues } from '../../getValues';
import { EditorFeature } from '../../EditorFeature';
import { isFulfillPost } from './isFulfillPost';
import { getPost } from './getPost';

const handleOpenModal = () => console.log('open');
const goBackPage = useCallback(() => {}, []);

// @ts-ignore
const handleCancel = useCallback(() => {
  const editorRef = useRef<EditorFeature | null>(null);
  if (!editorRef || !editorRef.current) {
    return;
  }
  const { title, tags, tag } = getValues();
  const body = editorRef.current.getContent();
  const { parsedTitle, parsedTags, parsedTag, parsedBody } = getPost(
    title,
    tags,
    tag,
    body,
  );

  if (isFulfillPost(parsedTitle, parsedTags, parsedTag, parsedBody)) {
    handleOpenModal();

    return;
  }

  goBackPage();
}, []);

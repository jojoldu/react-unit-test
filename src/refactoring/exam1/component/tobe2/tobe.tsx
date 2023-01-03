/* eslint-disable @typescript-eslint/no-unused-vars,no-console,@typescript-eslint/ban-ts-comment */

import { useCallback, useRef } from 'react';
import { getValues } from '../../getValues';
import { EditorFeature } from '../../EditorFeature';
import { Post } from './Post';

const handleOpenModal = () => console.log('open');
const goBackPage = useCallback(() => {}, []);

export const handleCancel = useCallback(() => {
  const editorRef = useRef<EditorFeature | null>(null);
  if (!editorRef || !editorRef.current) {
    return;
  }
  const body = editorRef.current.getContent();
  const post = Post.of(getValues(), body);

  if (post.isFilledPost()) {
    handleOpenModal();

    return;
  }

  goBackPage();
}, []);

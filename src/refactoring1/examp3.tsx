import { useCallback } from 'react';
import { getValues } from './getValues';

function handleOpenModal(goBackPostPage: any) {}

const handleCancel = useCallback(() => {
  const { title, tags, tag } = getValues();

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
    handleOpenModal(goBackPostPage);

    return;
  }

  goBackPostPage();
}, []);

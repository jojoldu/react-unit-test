import { useCallback, useRef } from 'react';
import { getValues } from '../getValues';
import { filterEnter } from '../filterEnter';
import { filterParagraphTag } from '../filterParagraphTag';
import { EditorFeature } from '../EditorFeature';

// eslint-disable-next-line no-console
const handleOpenModal = () => console.log('open');
const goBackPage = useCallback(() => {}, []);

const handleCancel = useCallback(() => {
  const editorRef = useRef<EditorFeature | null>(null);
  if (!editorRef || !editorRef.current) {
    return;
  }
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
    handleOpenModal();

    return;
  }

  goBackPage();
}, []);

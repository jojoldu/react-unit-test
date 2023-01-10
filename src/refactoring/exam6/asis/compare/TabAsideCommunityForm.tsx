// noinspection NonAsciiCharacters

import { isNil } from 'lodash-es';
import React, { useEffect, useRef, useState } from 'react';


type Inputs = {
  category: CommunityCategoryKeys;
  title: string;
  tags: { name: string }[];
};

type TabAsideCommunityFormProps = {
  category?: CommunityCategoryKeys;
  initValues?: CommunityForm;
  onSubmit: ({
    category,
    body,
    title,
    tags,
  }: {
    category: CommunityCategoryKeys;
  } & CommunityForm) => void;
  onCancel: () => void;
  isShowCategory?: boolean;
  submitButtonText?: string;
};

export default function TabAsideCommunityForm({
  category: initCategory,
  initValues,
}: TabAsideCommunityFormProps) {
  const { openModal } = useModals();

  const { slug } = useAppSelector((state) => state.lecture);

  const { data: course } = useCourse(slug);

  const { control, register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      category: initCategory || 'question',
      title: initValues?.title || '',
      tags: initValues?.tags?.map((tag) => ({ name: tag })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  const category = useWatch({
    control,
    name: 'category',
  });


  const [tagName, setTagName] = useState('');

  const editorRef = useRef<EditorFeature | null>(null);

  const [visible, setVisible] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === 'Enter') {
      e.preventDefault();

      // 꺽쇠, 콤마, 스페이스, 한글 단음 제거
      const curTagName = tagName.replace(/[ㄱ-ㅎ]|[ㅏ-ㅣ]/g, '');

      // 비어있으면 패스
      if (!curTagName.length) {
        return;
      }

      // 기존에 존재하지 않는 태그만 추가
      if (fields.map(({ name }) => name).indexOf(curTagName) !== -1) {
        setTagName('');

        return;
      }

      // 글자수 초과
      if (curTagName.length > MAX_TAG_LENGTH) {
        openModal();

        return;
      }

      // 태그 수 초과
      if (fields.length === MAX_TAGS_COUNT) {
        openModal();

        return;
      }
      append({ name: curTagName });
      setTagName('');

      return;
    }
  };

  const handleRemoveTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && fields.length !== 0 && tagName.length === 0) {
      const lastTag = fields.length - 1;

      remove(lastTag);
    }
  };

  const getPlaceholder = (type: keyof typeof COMMUNITY_CATEGORY) => {
    if (type === 'question') {
      return course?.questionGuide ? '' : PLACE_HOLDER[type];
    }

    return PLACE_HOLDER[type];
  };

  useEffect(() => {
    if (!isNil(course)) {
      setVisible(() => !course.whetherAnswer && category === 'question');
    }
  }, [course, category]);

  return (
    <form>
      <div>
      </div>
    </form>
  );
}

const MAX_TAGS_COUNT = 10;
const MAX_TAG_LENGTH = 20;

const PLACE_HOLDER = {
  question: '- 질문/답변' ,
  chat: `- 자유게시판`,
  study: '- 스터디'
};
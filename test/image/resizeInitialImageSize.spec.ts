import { resizeInitialImageSize } from '../../src/image/resizeInitialImageSize';
import { MIN_IMAGE_HEIGHT, MIN_IMAGE_WIDTH } from '../../src/image/constants';

const MAX_WIDTH = 322;

describe('resizeInitialImageSize', () => {
  it.each([
    {
      width: 200,
      height: 200,
      maxWidth: MAX_WIDTH,
    },
  ])(
    '최소,최대 조건을 모두 충족 할 때 원본 사이즈를 반환한다.',
    ({ width, height, maxWidth }) => {
      expect(resizeInitialImageSize({ width, height, maxWidth })).toEqual({
        width,
        height,
      });
    },
  );

  describe('width >= maxWidth 이면', () => {
    it.each([
      {
        width: MAX_WIDTH + 1,
        height: 230,
        maxWidth: MAX_WIDTH,
      },
    ])(
      'width($width)는 maxWidth($maxWidth)로 height는 비율에 맞게 리사이징 된다.',
      ({ width, height, maxWidth }) => {
        expect(resizeInitialImageSize({ width, height, maxWidth })).toEqual({
          width: maxWidth,
          height: Math.floor(maxWidth / (width / height)),
        });
      },
    );
  });

  describe('width < maxWidth 이면', () => {
    it.each([
      {
        width: MAX_WIDTH - 1,
        height: 230,
        maxWidth: MAX_WIDTH,
      },
    ])(
      'width($width)는 maxWidth($maxWidth)로 height는 비율에 맞게 리사이징 되지 않는다.',
      ({ width, height, maxWidth }) => {
        expect(resizeInitialImageSize({ width, height, maxWidth })).not.toEqual(
          {
            width: maxWidth,
            height: Math.floor(maxWidth / (width / height)),
          },
        );
      },
    );
  });

  describe('width < maxWidth 이고', () => {
    describe('height < MIN_IMAGE_HEIGHT 이면', () => {
      it.each([
        {
          width: MAX_WIDTH - 1,
          height: MIN_IMAGE_HEIGHT - 1,
          maxWidth: MAX_WIDTH,
        },
      ])(
        'height는 MIN_IMAGE_HEIGHT로 width($width)는 최소값과 상관 없이 비율에 맞게 리사이징 한다.',
        ({ width, height, maxWidth }) => {
          expect(resizeInitialImageSize({ width, height, maxWidth })).toEqual({
            width: Math.floor(MIN_IMAGE_HEIGHT / (height / width)),
            height: MIN_IMAGE_HEIGHT,
          });
        },
      );
    });

    describe('height >= MIN_IMAGE_HEIGHT 이면', () => {
      it.each([
        {
          width: MAX_WIDTH - 1,
          height: MIN_IMAGE_HEIGHT + 1,
          maxWidth: MAX_WIDTH,
        },
      ])(
        'height는 MIN_IMAGE_HEIGHT로 width($width)는 최소값과 상관 없이 비율에 맞게 리사이징 되지 않는다.',
        ({ width, height, maxWidth }) => {
          expect(
            resizeInitialImageSize({ width, height, maxWidth }),
          ).not.toEqual({
            width: Math.floor(MIN_IMAGE_HEIGHT / (height / width)),
            height: MIN_IMAGE_HEIGHT,
          });
        },
      );
    });
  });

  describe('width < maxWidth 이고', () => {
    describe('height >= MIN_IMAGE_HEIGHT 이고', () => {
      describe('width < MIN_IMAGE_WIDTH 이면', () => {
        it.each([
          {
            width: MIN_IMAGE_WIDTH - 1,
            height: MIN_IMAGE_HEIGHT + 1,
            maxWidth: MAX_WIDTH,
          },
        ])(
          'width($width)는 MIN_IMAGE_WIDTH로 height($height)는 비율에 맞게 리사이징 된다.',
          ({ width, height, maxWidth }) => {
            expect(resizeInitialImageSize({ width, height, maxWidth })).toEqual(
              {
                width: MIN_IMAGE_WIDTH,
                height: Math.floor(MIN_IMAGE_WIDTH / (width / height)),
              },
            );
          },
        );
      });

      describe('width >= MIN_IMAGE_WIDTH 이면', () => {
        it.each([
          {
            width: MIN_IMAGE_WIDTH + 1,
            height: MIN_IMAGE_HEIGHT + 1,
            maxWidth: MAX_WIDTH,
          },
        ])(
          'width($width)는 MIN_IMAGE_WIDTH로 height($height)는 비율에 맞게 리사이징 되지 않는다.',
          ({ width, height, maxWidth }) => {
            expect(
              resizeInitialImageSize({ width, height, maxWidth }),
            ).not.toEqual({
              width: MIN_IMAGE_WIDTH,
              height: Math.floor(MIN_IMAGE_WIDTH / (width / height)),
            });
          },
        );
      });
    });
  });
});

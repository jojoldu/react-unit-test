import { ImageSize, MIN_IMAGE_HEIGHT, MIN_IMAGE_WIDTH } from './constants';

export const resizeInitialImageSize = ({
  width,
  height,
  maxWidth,
}: ImageSize & { maxWidth: number }) => {
  if (width >= maxWidth) {
    return {
      width: maxWidth,
      height: Math.floor(maxWidth / (width / height)),
    };
  }

  if (height < MIN_IMAGE_HEIGHT) {
    return {
      width: Math.floor(MIN_IMAGE_HEIGHT / (height / width)),
      height: MIN_IMAGE_HEIGHT,
    };
  }

  if (width < MIN_IMAGE_WIDTH) {
    return {
      width: MIN_IMAGE_WIDTH,
      height: Math.floor(MIN_IMAGE_WIDTH / (width / height)),
    };
  }

  return {
    width,
    height,
  };
};

import { ImageSize } from './constants';

class ImageResizer {
  protected width: number;
  protected height: number;
  protected maxWidth: number;
  protected aspectRatio: number;

  constructor({ width, height, maxWidth }: ImageSize) {
    this.width = width;
    this.height = height;
    this.maxWidth = maxWidth;
    this.aspectRatio = width / height;
  }

  resize(): ImageSize {
    return { width: this.width, height: this.height };
  }
}

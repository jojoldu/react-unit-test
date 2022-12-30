export function isFilledPost(
  title: string,
  tags: string[],
  tag: string,
  body: string,
) {
  return title !== '' || tags.length !== 0 || tag !== '' || body !== '';
}

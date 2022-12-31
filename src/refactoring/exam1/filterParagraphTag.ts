export function filterParagraphTag(content: string) {
  return content.trim().replace(/<p[^>]+?>|<p>|<\/p>/g, '');
}

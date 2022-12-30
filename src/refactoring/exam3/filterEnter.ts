export function filterEnter(content: string, replaceStr = ' ') {
  return content.replace(/\r?\n|\r/g, replaceStr);
}

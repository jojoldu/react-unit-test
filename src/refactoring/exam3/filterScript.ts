export function filterScript({
  isAcceptXss = false,
  editorContent,
}: {
  isAcceptXss?: boolean;
  editorContent: string;
}) {
  const content = editorContent.trim();
  const preventXssContent = content.replace(
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    '',
  );

  return isAcceptXss ? content : preventXssContent;
}

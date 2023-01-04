export function renderPositionEndedAt(positionEndedAt: string | Date): string {
  const date =
    positionEndedAt instanceof Date ? String(positionEndedAt) : positionEndedAt;

  return date === '9999. 12. 31.' ? '채용 시 마감' : date;
}

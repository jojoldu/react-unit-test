export type CommentStatusCode =
  typeof CommentVoteStatusCode[keyof typeof CommentVoteStatusCode];
export const CommentVoteStatusCode = {
  DELETE_COMMENT: 'DELETE_COMMENT',
  UPDATED: 'UPDATED',
  CANCEL_UP: 'CANCEL_UP',
  CANCEL_DOWN: 'CANCEL_DOWN',
} as const;

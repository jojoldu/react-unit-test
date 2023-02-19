export const JobApplicantVoteStatusCode = {
  UP: 'UP',
  CANCEL_UP: 'CANCEL_UP',
  DOWN: 'DOWN',
  CANCEL_DOWN: 'CANCEL_DOWN',
} as const;

export type JobApplicantVoteStatusCode =
  typeof JobApplicantVoteStatusCode[keyof typeof JobApplicantVoteStatusCode];

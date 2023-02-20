export const JobApplicantVoteStatusCode = {
  UP: 'UP',
  CANCEL_UP: 'CANCEL_UP',
  DOWN: 'DOWN',
  CANCEL_DOWN: 'CANCEL_DOWN',
} as const;

export type JobApplicantVoteStatusCode =
  typeof JobApplicantVoteStatusCode[keyof typeof JobApplicantVoteStatusCode];

// 객체에 책임 위임하기
export function hasCancelVoteStatus(voteStatus: string | null) {
  return (
    voteStatus === JobApplicantVoteStatusCode.CANCEL_UP ||
    voteStatus === JobApplicantVoteStatusCode.CANCEL_DOWN
  );
}

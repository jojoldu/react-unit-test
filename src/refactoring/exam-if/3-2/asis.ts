import { JobApplicantVoteStatusCode } from './JobApplicantVoteStatus';
import { Vote } from './Vote';
import {
  CommentStatusCode,
  CommentVoteStatusCode,
} from './CommentVoteStatusCode';
import JobApplicantStateResponseDtoV2 from './JobApplicantStateResponseDtoV2';

export function jobApplicantStateDtoForCommentSection(
  jobApplicantStates: JobApplicantStateResponseDtoV2[],
) {
  return jobApplicantStates.map((jobApplicantState) => {
    const { jobApplicantComments, ...item } = jobApplicantState;

    return {
      ...item,
      jobApplicantComments: jobApplicantComments.map((states) => {
        const {
          createdAt,
          updatedAt,
          deletedAt,
          beforeVote,
          currentVote,
          comment,
        } = states;
        let voteStatus: CommentStatusCode | null = null;

        if (comment !== null) {
          if (deletedAt) {
            voteStatus = CommentVoteStatusCode.DELETE_COMMENT;
          } else if (createdAt !== updatedAt) {
            voteStatus = CommentVoteStatusCode.UPDATED;
          }
        } else if (
          currentVote === JobApplicantVoteStatusCode.CANCEL_UP ||
          currentVote === JobApplicantVoteStatusCode.CANCEL_DOWN
        ) {
          voteStatus =
            currentVote === JobApplicantVoteStatusCode.CANCEL_UP
              ? CommentVoteStatusCode.CANCEL_UP
              : CommentVoteStatusCode.CANCEL_DOWN;
        }

        let vote: Vote | null = null;

        if (
          currentVote === JobApplicantVoteStatusCode.UP ||
          currentVote === JobApplicantVoteStatusCode.DOWN
        ) {
          if (
            beforeVote === null ||
            beforeVote === JobApplicantVoteStatusCode.CANCEL_DOWN ||
            beforeVote === JobApplicantVoteStatusCode.CANCEL_UP
          ) {
            vote =
              currentVote === JobApplicantVoteStatusCode.UP
                ? Vote.UP
                : Vote.DOWN;
          } else if (beforeVote !== currentVote) {
            vote =
              currentVote === JobApplicantVoteStatusCode.UP
                ? Vote.DOWN_TO_UP
                : Vote.UP_TO_DOWN;
          }
        }

        return {
          ...states,
          voteStatus,
          vote,
        };
      }),
    };
  });
}

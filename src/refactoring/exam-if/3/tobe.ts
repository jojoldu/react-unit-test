import { JobApplicantVoteStatusCode } from './JobApplicantVoteStatus';
import { Vote } from './Vote';
import {
  CommentStatusCode,
  CommentVoteStatusCode,
} from './CommentVoteStatusCode';
import JobApplicantStateResponseDtoV2 from './JobApplicantStateResponseDtoV2';

function getVoteStatus(
  comment: string | null,
  deletedAt: string | null,
  createdAt: string,
  updatedAt: string,
  currentVote: 'CANCEL_UP' | 'DOWN' | 'CANCEL_DOWN' | 'UP' | null,
): CommentStatusCode | null {
  if (
    currentVote === JobApplicantVoteStatusCode.CANCEL_UP ||
    currentVote === JobApplicantVoteStatusCode.CANCEL_DOWN
  ) {
    return currentVote === JobApplicantVoteStatusCode.CANCEL_UP
      ? CommentVoteStatusCode.CANCEL_UP
      : CommentVoteStatusCode.CANCEL_DOWN;
  }

  if (comment === null) {
    return null;
  }

  if (deletedAt) {
    return CommentVoteStatusCode.DELETE_COMMENT;
  }

  if (createdAt !== updatedAt) {
    return CommentVoteStatusCode.UPDATED;
  }

  return null;
}

function getVote(
  currentVote: 'CANCEL_UP' | 'DOWN' | 'CANCEL_DOWN' | 'UP' | null,
  beforeVote: 'CANCEL_UP' | 'DOWN' | 'CANCEL_DOWN' | 'UP' | null,
) {
  if (
    currentVote !== JobApplicantVoteStatusCode.UP &&
    currentVote !== JobApplicantVoteStatusCode.DOWN
  ) {
    return null;
  }

  if (
    beforeVote === null ||
    beforeVote === JobApplicantVoteStatusCode.CANCEL_DOWN ||
    beforeVote === JobApplicantVoteStatusCode.CANCEL_UP
  ) {
    return currentVote === JobApplicantVoteStatusCode.UP ? Vote.UP : Vote.DOWN;
  }

  if (beforeVote !== currentVote) {
    return currentVote === JobApplicantVoteStatusCode.UP
      ? Vote.DOWN_TO_UP
      : Vote.UP_TO_DOWN;
  }

  return null;
}

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
        const voteStatus = getVoteStatus(
          comment,
          deletedAt,
          createdAt,
          updatedAt,
          currentVote,
        );

        const vote = getVote(currentVote, beforeVote);

        return {
          ...states,
          voteStatus,
          vote,
        };
      }),
    };
  });
}

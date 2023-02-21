import {
  hasCancelVoteStatus,
  JobApplicantVoteStatusCode,
} from './JobApplicantVoteStatus';
import { Vote } from './Vote';
import {
  CommentStatusCode,
  CommentVoteStatusCode,
} from './CommentVoteStatusCode';
import JobApplicantStateResponseDtoV2 from './JobApplicantStateResponseDtoV2';

/**
 * 1. 함수로 먼저 추출해본다.
 * 2. 기본값 (null, Default Object, Null Object) 으로 반환되는 경우를 고려해서 먼저 반환시킨다.
 * 3. 가장 마지막에 갚을 덮어 쓰는 경우는 차라리 먼저 반환시킨다.
 * 4. 특정 케이스일 경우에만 if을 추가한다.
 */
function getVoteStatus(
  comment: string | null,
  deletedAt: string | null,
  createdAt: string,
  updatedAt: string,
  currentVote: JobApplicantVoteStatusCode | null,
): CommentStatusCode | null {
  if (hasCancelVoteStatus(currentVote)) {
    return JobApplicantVoteStatusCode.CANCEL_UP
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
  currentVote: JobApplicantVoteStatusCode | null,
  beforeVote: JobApplicantVoteStatusCode | null,
) {
  if (
    currentVote !== JobApplicantVoteStatusCode.UP &&
    currentVote !== JobApplicantVoteStatusCode.DOWN
  ) {
    return null;
  }

  if (beforeVote === null || hasCancelVoteStatus(beforeVote)) {
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

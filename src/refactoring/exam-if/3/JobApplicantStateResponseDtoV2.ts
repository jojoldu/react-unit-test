import { JobApplicantVoteStatusCode } from './JobApplicantVoteStatus';

export default class JobApplicantStateResponseDtoV2 {
  public id: number;

  public step: string;

  public createdAt: string;

  public companyUserName: string;

  public voteDownCount: number;

  public voteUpCount: number;

  public jobApplicantComments: JobApplicantCommentResponseType[];
}

export type JobApplicantCommentResponseType = {
  id: number;
  companyUserId: number;
  name: string;
  isWrittenByMe: boolean;
  beforeVote: JobApplicantVoteStatusCode | null;
  currentVote: JobApplicantVoteStatusCode | null;
  comment: string | null;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

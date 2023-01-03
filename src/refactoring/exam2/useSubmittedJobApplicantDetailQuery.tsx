import { JobLevel } from './category';

export function useSubmittedJobApplicantDetailQuery(
  applicantId: number,
  param: { apiVersion: number },
) {
  return {
    data: {
      positionTitle: `title-${applicantId}-${param.apiVersion}`,
      companyName: '',
      positionJobLevel: 'SENIOR' as keyof typeof JobLevel,
      positionEndedAt: '',
    },
  };
}

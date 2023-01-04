import _ from 'lodash';
import { PositionSummarySectionProps } from '../../../positionSummarySectionProps';
import { useSubmittedJobApplicantDetailQuery } from '../../../useSubmittedJobApplicantDetailQuery';
import { renderPositionEndedAt } from './renderPositionEndedAt';
import { JobLevel } from '../../../category';

function getColumns(
  positionTitle: string,
  companyName: string,
  positionJobLevel: 'IRRELEVANT' | 'INTERN' | 'BEGINNER' | 'JUNIOR' | 'SENIOR',
  positionEndedAt: string,
) {
  return [
    { title: '공고명', value: positionTitle },
    { title: '회사명', value: companyName },
    {
      title: '직급',
      value: JobLevel[positionJobLevel],
    },
    { title: '마감일', value: renderPositionEndedAt(positionEndedAt) },
  ];
}

export const PositionSummarySection = ({
  applicantId,
}: PositionSummarySectionProps) => {
  const { data: jobApplicant } = useSubmittedJobApplicantDetailQuery(
    applicantId,
    {
      apiVersion: 3,
    },
  );

  const { positionTitle, companyName, positionJobLevel, positionEndedAt } =
    jobApplicant;
  const columns = getColumns(
    positionTitle,
    companyName,
    positionJobLevel,
    positionEndedAt,
  );

  return (
    <dl>
      {_.map(columns, ({ title }) => (
        <section key={title}>
          <dt>
            <p>{title}</p>
          </dt>
        </section>
      ))}
    </dl>
  );
};

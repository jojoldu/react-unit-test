import _ from 'lodash';
import { useSubmittedJobApplicantDetailQuery } from '../useSubmittedJobApplicantDetailQuery';
import { JobLevel } from '../category';
interface PositionSummarySectionProps {
  applicantId: number;
}

const PositionSummarySection = ({
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
  const columns = [
    { title: '공고명', value: positionTitle },
    { title: '회사명', value: companyName },
    {
      title: '직급',
      value: JobLevel[positionJobLevel],
    },
    { title: '마감일', value: renderPositionEndedAt(positionEndedAt) },
  ];

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

function renderPositionEndedAt(positionEndedAt: string | Date): string {
  const date =
    positionEndedAt instanceof Date ? String(positionEndedAt) : positionEndedAt;

  return date === '9999. 12. 31.' ? '채용 시 마감' : date;
}

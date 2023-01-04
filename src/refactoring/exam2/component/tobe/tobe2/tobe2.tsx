import _ from 'lodash';
import { PositionSummarySectionProps } from '../../../positionSummarySectionProps';
import { useSubmittedJobApplicantDetailQuery } from '../../../useSubmittedJobApplicantDetailQuery';
import { getPositionSummary, PositionSummary } from './PositionSummary';

export const PositionSummarySection = ({
  applicantId,
}: PositionSummarySectionProps) => {
  const { data: jobApplicant } = useSubmittedJobApplicantDetailQuery(
    applicantId,
    {
      apiVersion: 3,
    },
  );

  const columns = PositionSummary.byJobApplicant(jobApplicant).columns;
  // const columns = getPositionSummary(jobApplicant);

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

import { CompanySelling } from '../basic1/type/CompanySelling';
import { apiSendFee } from '../basic1/api/apiSendFee';
import dayjs from 'dayjs';

/**
 * 여기서 순수 함수와 부수효과 함수는 각각 몇개씩 존재하는지?
 */
export function sendCompanyFees(companySellings: CompanySelling[]) {
  const companyFees = getCompanyFees(companySellings);
  for (const companyFee of companyFees) {
    apiSendFee(companyFee.bankCode, companyFee.fee);
  }
}

export function getCompanyFees(companySellings: CompanySelling[]) {
  return companySellings
    .map((c) => getCompanyFee(c))
    .filter((c) => c.fee > 100); // 100원 이상이면 송금하기
}

export function getCompanyFee(companySelling: CompanySelling) {
  // 현재 시간의 한달뒤가 결제일
  const billedAt: string = dayjs().add(1, 'month').format('YYYY-MM-DD');
  return {
    fee: companySelling.sellingAmount * companySelling.commission,
    bankCode: companySelling.bankCode,
    billedAt,
  };
}

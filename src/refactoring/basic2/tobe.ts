import { CompanySelling } from '../basic1/type/CompanySelling';
import { apiSendFee } from '../basic1/api/apiSendFee';

export function sendCompanyFees(companySellings: CompanySelling[]) {
  const companyFees = getCompanyFees(companySellings);
  for (const companyFee of companyFees) {
    apiSendFee(companyFee.bankCode, companyFee.fee);
  }
}

function getCompanyFees(companySellings: CompanySelling[]) {
  return companySellings
    .map((c) => getCompanyFee(c))
    .filter((c) => c.fee > 100); // 100원 이상이면 송금하기
}

function getCompanyFee(
  companySelling: CompanySelling,
  requestAt = new Date().toISOString(),
) {
  return {
    fee: companySelling.sellingAmount * companySelling.commission,
    bankCode: companySelling.bankCode,
    requestAt: requestAt,
  };
}

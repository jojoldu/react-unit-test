import { CompanySelling } from './type/CompanySelling';
import { apiSendFee } from './api/apiSendFee';

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

function getCompanyFee(companySelling: CompanySelling) {
  return {
    fee: companySelling.sellingAmount * companySelling.commission,
    bankCode: companySelling.bankCode,
  };
}

import { CompanySelling } from './type/CompanySelling';
import { apiSendFee } from './api/apiSendFee';
import { Modal } from './Modal';

// 부수효과
export async function sendCompanyFees(companySellings: CompanySelling[]) {
  const companyFees = getCompanyFees(companySellings);
  for (const companyFee of companyFees) {
    await apiSendFee(companyFee.bankCode, companyFee.fee);
  }
  Modal.open(`${companySellings.length} 개 기업들에게 송금되었습니다.`);
}
// ---------------------------------------------------------------------
// 순수함수
export function getCompanyFees(companySellings: CompanySelling[]) {
  return companySellings
    .map((c) => getCompanyFee(c))
    .filter((c) => c.fee >= 100); // 100원 이상이면 송금하기
}

function getCompanyFee(companySelling: CompanySelling) {
  return {
    fee: companySelling.sellingAmount * companySelling.commission,
    bankCode: companySelling.bankCode,
  };
}

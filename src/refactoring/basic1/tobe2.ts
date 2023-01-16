import { CompanySelling } from './type/CompanySelling';
import { axiosSendFee } from './api/axiosSendFee';
import { Modal } from './Modal';
import { CompanyFee } from './CompanyFee';

export async function sendCompanyFees(companySellings: CompanySelling[]) {
  const companyFees = getCompanyFees(companySellings);
  for (const companyFee of companyFees) {
    await axiosSendFee(companyFee.bankCode, companyFee.fee);
  }
  Modal.open(`${companySellings.length} 개 기업들에게 송금되었습니다.`);
}

export function getCompanyFees(companySellings: CompanySelling[]) {
  return companySellings
    .map((c) => getCompanyFee(c))
    .filter((c) => c.isSend); // 송금 가능 조건을 굳이 몰라도 됨
}

function getCompanyFee(companySelling: CompanySelling) {
  return new CompanyFee(companySelling);
}

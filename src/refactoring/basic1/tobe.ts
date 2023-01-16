import { CompanySelling } from './type/CompanySelling';
import { axiosSendFee } from './api/axiosSendFee';
import { Modal } from './Modal';

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
    .filter((c) => isSend(c));
}

function isSend(c: { bankCode: string; fee: number }) {
  return c.fee >= 100;
}

function getCompanyFee(companySelling: CompanySelling) {
  return {
    fee: companySelling.sellingAmount * companySelling.commission,
    bankCode: companySelling.bankCode,
  };
}

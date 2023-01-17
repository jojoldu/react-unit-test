import { CompanySelling } from './type/CompanySelling';
import { axiosSendFee } from './api/axiosSendFee';
import { Modal } from './Modal';
import { CompanyFees } from './CompanyFees';

export async function sendCompanyFees(companySellings: CompanySelling[]) {
  await sendFees(companySellings);
  Modal.open(`${companySellings.length} 개 기업들에게 송금되었습니다.`);
}
async function sendFees(companySellings: CompanySelling[]) {
  const companyFees = new CompanyFees(companySellings);
  for (const companyFee of companyFees.sendableItems) {
    await axiosSendFee(companyFee.bankCode, companyFee.fee);
  }
}

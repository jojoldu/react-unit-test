import { CompanySelling } from './type/CompanySelling';
import { apiSendFee } from './api/apiSendFee';
import { Modal } from './Modal';

export async function sendCompanyFees(companySellings: CompanySelling[]) {
  await sendFees(companySellings);
  Modal.open(`${companySellings.length} 개 기업들에게 송금되었습니다.`);
}

export async function sendFees(companySellings: CompanySelling[]) {
  for (const companySelling of companySellings) {
    await sendFee(companySelling);
  }
}

export async function sendFee(companySelling: CompanySelling) {
  const fee = companySelling.sellingAmount * companySelling.commission;

  if (fee >= 100) {
    // 100원 이상이면 송금하기
    await apiSendFee(companySelling.bankCode, fee);
  }
}

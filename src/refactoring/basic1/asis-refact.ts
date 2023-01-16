import { CompanySelling } from './type/CompanySelling';
import { axiosSendFee } from './api/axiosSendFee';
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
  const fee = getFee(companySelling);

  if (fee >= 100) {
    // 100원 이상이면 송금하기
    await axiosSendFee(companySelling.bankCode, fee);
  }
}

function getFee(companySelling: CompanySelling) {
  return companySelling.sellingAmount * companySelling.commission;
}

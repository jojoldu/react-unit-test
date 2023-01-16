import { CompanySelling } from './type/CompanySelling';
import { axiosSendFee } from './api/axiosSendFee';
import { Modal } from './Modal';

export async function sendCompanyFees(companySellings: CompanySelling[]) {
  for (const companySelling of companySellings) {
    const fee = companySelling.sellingAmount * companySelling.commission;

    if (fee >= 100) {
      await axiosSendFee(companySelling.bankCode, fee);
    }
  }

  Modal.open(`${companySellings.length} 개 기업들에게 송금되었습니다.`);
}

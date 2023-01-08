import { CompanySelling } from './type/CompanySelling';
import { apiSendFee } from './api/apiSendFee';

export async function sendCompanyFees(companySellings: CompanySelling[]) {
  for (const companySelling of companySellings) {
    const fee = companySelling.sellingAmount * companySelling.commission;

    if (fee >= 100) {
      // 100원 이상이면 송금하기
      await apiSendFee(companySelling.bankCode, fee);
    }
  }
}

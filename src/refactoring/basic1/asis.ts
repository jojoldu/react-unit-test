import { CompanySelling } from './type/CompanySelling';
import { apiSendFee } from './api/apiSendFee';

function sendFee(fee: number, companySelling: CompanySelling) {
  if (fee >= 100) {
    // 100원 이상이면 송금하기
    apiSendFee(companySelling.bankCode, fee);
  }
}

function sendFeeWithCalculate(companySelling: CompanySelling) {
  const fee = companySelling.sellingAmount * companySelling.commission;
  sendFee(fee, companySelling);
}

function sendFees(companySellings: CompanySelling[]) {
  for (const companySelling of companySellings) {
    sendFeeWithCalculate(companySelling);
  }
}

export function main(companySellings: CompanySelling[]) {
  sendFees(companySellings);
}

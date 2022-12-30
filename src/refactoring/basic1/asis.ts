import { CompanySelling } from "./type/CompanySelling";
import { apiSendFee } from "./api/apiSendFee";

/**
 * 여기서 순수 함수와 부수효과 함수는 각각 몇개씩 존재하는지?
 */
export function sendCompanyFees(companySellings: CompanySelling[]) {
  sendFees(companySellings);
}

function sendFees (companySellings: CompanySelling[]) {
  for (const companySelling of companySellings) {
    sendFee(companySelling);
  }
}

function sendFee(companySelling: CompanySelling) {
  const fee = companySelling.sellingAmount * companySelling.commission;

  if(fee >= 100) { // 100원 이상이면 송금하기
    apiSendFee(companySelling.bankCode, fee);
  }
}


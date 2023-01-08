# 1. 좋은 함수 만들기 - 순수 함수 알아보기

요즘은 프레임워크, 라이브러리, 아키텍처, 클라우드 등이 많이 언급되다보니 이에 대해서 주니어분들도 많은 관심을 가진다.  
그러다보니 MSA나 React 생태계 (`react-hook-form`, `react-query`), 혹은 CI/CD, DDD 등에 대한 이야기를 면접때나 사석에서 만날때 자주 듣게 된다.  
  

A pure function, one without side-effects whose return value depends only on its arguments 
(https://wiki.fluidproject.org/display/fluid/A+Good+Function)

`OOP를 하지 않는 것` !== `FP를 하는 것` 


##  

```ts
export async function sendCompanyFees(companySellings: CompanySelling[]) {
  for (const companySelling of companySellings) {
    const fee = companySelling.sellingAmount * companySelling.commission;

    if (fee >= 100) {
      // 100원 이상이면 송금하기
      await apiSendFee(companySelling.bankCode, fee);
    }
  }
}
```

### 리팩토링 1 (Bad)

### 리팩토링 2 (Good)

```ts
export async function sendCompanyFees(companySellings: CompanySelling[]) {
  const companyFees = getCompanyFees(companySellings);
  for (const companyFee of companyFees) {
    await apiSendFee(companyFee.bankCode, companyFee.fee);
  }
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
```

# 1. 좋은 함수 만들기 - 부수효과와 거리두기

요즘의 개발에서 프레임워크나 라이브러리 사용이 없는 개발은 생각하기 어렵다.  
복잡한 애플리케이션 구현

다만, 이게 심해지다보면 실제 구현을 해야할 변수, 함수, 클래스 등을 잘 작성하는 것보다 **프레임워크나 라이브러리의 기능을 얼마나 많이 알고 있느냐**를 개발자의 성장으로 오해할 수도 있다.  
  
프레임워크와 라이브버리와 같은 도구에 대해서 숙련도가 높다면 당연히 좋겠지만, 그 이전에 좋은 변수, 함수, 클래스에 대해 먼저 고민하는 것도 필요하다.  
  
그래서 이번 시리즈에서는 좋은 함수에 대해서 이야기하려고 한다.

> 함수형 프로그래밍에 대해 이야기하는 시리즈는 아니니, 편하게 봐도 좋다.
> JS/TS 환경에서 불변객체 다루는 방법이 Nice 하다고 생각하진 않는다.

## 좋은 함수

구글에서 좋은 함수 (Good Function)에 대해 검색해보면 다음과 같이 **순수 함수**에 대한 이야기가 자주 언급된다.

![search1](./images/search1.png)

![search2](./images/search2.png)


## 예제 

다음과 같이 **각 기업들의 판매 정보를 가져와 판매금액을 정산 해주는 기능**을 만든다고 가정해보자.   

```ts
export async function sendCompanyFees(companySellings: CompanySelling[]) {
  for (const companySelling of companySellings) {
    const fee = companySelling.sellingAmount * companySelling.commission;

    if (fee >= 100) {
      await apiSendFee(companySelling.bankCode, fee);
    }
  }

  Modal.open(`${companySellings.length} 개 기업들에게 송금되었습니다.`);
}
```

> `for` 를 `Promise.all` 로 리팩토링 해야하는 것은 여기서 중요 개선점은 아니다.


이 함수의 요구 사항은 다음과 같다.

* 기업 판매 정보 (`CompanySelling`) 들을 받아서
* 각 기업별 정산 금액 (`판매금액 * 정산율`) 을 계산 해서  
* 100원이 넘는 경우에만
* API로 전달한다.


## 리팩토링 1 (Bad)

먼저 

```ts
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
    await apiSendFee(companySelling.bankCode, fee);
  }
}

function getFee(companySelling: CompanySelling) {
  return companySelling.sellingAmount * companySelling.commission;
}
```

그리고 이렇게 분리된 함수들을 각자 **단위 테스트를 작성**해본다.

```ts
jest.mock('./api/apiSendFee'); // API를 Mocking 한다

describe('basic1/asis-refact', () => {
  describe('sendFee', () => {
    it('100원이상이면 api를 호출한다', async () => {
      // when
      await sendFee({
        sellingAmount: 1000,
        commission: 0.1,
        bankCode: '032',
      });

      // then
      expect(apiSendFee).toBeCalledTimes(1);
    });

    it('100원미만이면 api를 호출하지 않는다', async () => {
      // when
      await sendFee({
        sellingAmount: 100,
        commission: 0.1,
        bankCode: '032',
      });

      //then
      expect(apiSendFee).toBeCalledTimes(0);
    });
  });

  describe('sendFees', () => {
    it('100원이상인 건수만큼 api를 호출한다', async () => {
      //given
      const sellings = [
        {
          sellingAmount: 1000,
          commission: 0.1,
          bankCode: '032',
        },
        {
          sellingAmount: 100,
          commission: 0.1,
          bankCode: '032',
        },
      ];

      // when
      await sendFees(sellings);

      // then
      expect(apiSendFee).toBeCalledTimes(1);
    });
  });
});
```

### 문제점

## 리팩토링 2 (Good)

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

누군가는 이 개선건에 대해 순회가 2번 이루어지기 때문에 비효율적인게 아니냐고 할 수 있다.  
하지만, **성능 개선은 실제 성능 이슈가 나오고 나서 하는게 좋다**.  
그전까지는 최대한 **테스트 하기 쉽고, 파악하기 좋은 코드**를 작성하는 것이 우선이다.  
이렇게 작성 되어야, 실제 성능 이슈가 발생해도 **어느 지점을 개선해얗라지 파악하기 쉽다**.

## 암묵적 입력/출력

좋은 함수

- 부수효과가 없으며, 멱등성을 유지할 수 있는 함수

#### 암묵적 입력

- 전역 변수에서 값을 가져올 경우
- 상태 관리에서 값을 가져올 경우
- 쿠키, LocalStorage, Dom 등에서 값을 가져온 경우
- API, 파일 등 외부에서 값을 가져오는 경우 

#### 암묵적 출력

- 전역 변수의 값을 변경하는 경우
- 쿠키, 세션등의 값을 변경하는 경우
- API, 파일 등 외부 서비스를 호출하는 경우
- Console.log 등 표준 입출력을 사용한 경우
- 브라우저 Windows 함수를 호출하는 경우

#### 부수효과 함수

- 인자값이 없는데 반환값이 있는 경우
- 인자값이 있는데 반환값이 없는 경우
- 인자값과 반환값 둘 다 없는 경우
- async 가 선언된 경우


## 마무리


테스트하기가 쉽다고 꼭 좋은 함수일 수는 없지만,  
**좋은 함수는 테스트 하기가 쉽다**.  
그래서 현재의 함수가 테스트 하기가 어렵다면, 함수 설계에 대해 고민해볼 수 있는 신호가 된다.



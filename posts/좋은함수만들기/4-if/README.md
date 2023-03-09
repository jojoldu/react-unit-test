# 3. 좋은 함수 만들기 - if 개선하기

지난 시간에는 함수 내부의 로직를 어떤 기준을 가지고 추출할지에 대해 이야기를 나눴다.  
이번 시간에는 그렇게 해서 추출된 함수 내부의 코드를 개선하는 방법을 이야기한다.  
  
함수의 코드를 개선하는 여러 방법 중, 첫번째로 `if` 문을 정리하는 것이다.  
단순히 `if` 문을 제거하기 보다는 어떤 기준을 가지고 개선하면 좋을지이다.  

## Why


프로그래밍에서 if-else 절을 리팩토링하는 것은 코드의 가독성과 유지보수성을 높이고 오류 발생률을 낮출 수 있기 때문에 중요합니다. if-else 문은 프로그래밍에서 조건부 논리를 구현하는 일반적인 방법이지만, 논리의 복잡성이 증가함에 따라 if-else 문을 읽고 이해하기 어려워질 수 있습니다.

if-else 절을 리팩토링할 때는 if-else 문을 다형성으로 대체하거나, 스위치 문이나 패턴 매칭을 사용하거나, 가드 절을 사용하는 등 다양한 기법을 사용할 수 있습니다. 이러한 기법을 사용하면 코드를 보다 모듈화하고 수정하기 쉬워져 유지보수성이 향상될 수 있습니다.

또한 리팩터링은 코드의 버그 위험을 줄이는 데 도움이 될 수 있습니다. 복잡한 if-else 문은 철저하게 테스트하기 어려울 수 있으며, 로직을 조금만 변경해도 미묘한 버그가 발생할 수 있습니다. 조건부 논리를 단순화하면 테스트하기 쉽고 버그가 포함될 가능성을 줄일 수 있습니다.

요약하면, 프로그래밍에서 if-else 절을 리팩토링하는 것은 코드의 가독성, 유지보수성 및 정확성을 향상시킬 수 있기 때문에 중요합니다. 고품질 소프트웨어를 만드는 데 필수적인 기술입니다.

## Default Parameter


```ts
export function sumAnything(
  num1: number,
  num2: number,
  etc: number | undefined,
) {
  if (etc === undefined) {
    return num1 + num2;
  } else {
    return num1 + num2 + etc;
  }
}
```

JS/TS에서는 `undefined` 는 Default Parameter로 대신할 수 있다.  
(`null` 은 지원하지 않는다.)

```ts
export function sumAnything(num1: number, num2: number, etc = 0) {
  return num1 + num2 + etc;
}
```

다음과 같이 호출할 경우 모두 정상적으로 `undefined` 가 `0` 을 사용한다.

```ts
  it('호출 파라미터가 없으면 기본 파라미터가 사용된다', () => {
    const result = sumAnything(1, 2);
    expect(result).toBe(3);
  });

  it('undefined로 넘기면 기본 파라미터가 사용된다', () => {
    const result = sumAnything(1, 2, undefined);
    expect(result).toBe(3);
  });
```

만약 `null` 등 여러 경우를 고려해서 진행해야한다면 어쩔 수없이 `OR (|)` 연산자를 이용한다.


## return with boolean

요구사항
- **입력값 이상의 숫자가 하나라도 있으면** `false` 를 반환해주세요.

이 요구사항에 맞게 구현을 해보자.

```ts
export function isAllUnderBy(numbers: number[], limit) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] >= limit) {
      return false;
    }
  }
  return true;
}
```

하지만 이 요구사항을 반대로 고려해보자.

-  **모든 숫자가 입력값 보다 미만일 경우**에만 `true` 를 반환해주세요.

```ts
export function isAllUnderBy(numbers: number[], limit: number) {
  return numbers.every((n) => n < limit: number);
}
```

## Early Exit (Guard Clauses)

컴퓨터 프로그래밍에서 가드는 해당 분기에서 프로그램 실행을 계속하려면 참으로 평가되어야 하는 부울 표현식이다.

요구사항은 다음과 같다

- API에서 가져온 `User`가 있을 경우
  - 해당 User의 `level`이 `GREEN | RED` 인 경우
    - 해당 User의 `region` 이 `SEOUL` 이면 수수료를 계산해서 반환
    - 해당 User의 `region` 이 `SEOUL` 이 아니면 `Not Seoul Region` 에러 메세지를 반환
  - 해당 User의 `level`이 `GREEN | RED` 가 아닌 경우 ` Not GREEN or RED Level` 에러 메세지 반환
- API에서 가져온 `User`가 없을 경우 `User NotFound!` 에러 메세지를 반환

이와 같은 요구사항을 기반으로 코드를 작성하면 다음과 같다.

```ts
export async function calculateFee(userId: number) {
  const user = await fetchUser(`/api/user?id=${userId}`);

  if (user) {
    if (user.level === 'GREEN' || user.level === 'RED') {
      if (user.region === 'SEOUL') {
        return getFee(user);
      }
      throw new UserRegionError(`${userId} is Not Seoul Region`);
    } else {
      throw new UserLevelError(`${userId} is Not GREEN or RED Level`);
    }
  } else {
    throw new NotFoundError('User NotFound!');
  }
}
```

**원하는 상태가 아닐때마다 그에 따른 적절한 Exception을 발생**시켜야하기 때문에 자주 `if else`가 중첩될 수 밖에 없다.


```ts
export async function calculateFee(userId: number) {
  const user = await fetchUser(`/api/user?id=${userId}`);

  if (!user) {
    throw new NotFoundError('User NotFound!');
  }

  if (user.level !== 'GREEN' && user.level !== 'RED') {
    throw new UserLevelError(`${userId} is Not GREEN or RED Level`);
  }

  if (user.region !== 'SEOUL') {
    throw new UserRegionError(`${userId} is Not Seoul Region`);
  }

  return getFee(user);
}
```


주요 비즈니스 로직은 항상 낮은 depth에서 수행하도록 한다.



## 마무리

if문은 "기획자의 말" 을 그대로 옮긴 경우가 많다.  
개발자가 그대로 
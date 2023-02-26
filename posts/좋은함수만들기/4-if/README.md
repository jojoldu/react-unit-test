# 3. 좋은 함수 만들기 - if 개선하기


기획, 사용자 스토리 그대로 코드를 옮기지 말 것.

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
# 2. 좋은 함수 만들기 - 부작용 관리하기

[지난 시간]() 에


## 암묵적 입력/출력

좋은 함수

- 부수효과가 없으며, 멱등성을 유지할 수 있는 함수

#### 암묵적 입력

- 전역 변수에서 값을 가져올 경우
- 상태 관리에서 값을 가져올 경우
- 쿠키, LocalStorage, Dom 등에서 값을 가져온 경우
- API, 파일 등 외부에서 값을 가져오는 경우 

예를 들자면 다음과 같은 경우 암묵적 입력이다.

![input1](./images/input1.png)

#### 암묵적 출력

- 전역 변수의 값을 변경하는 경우
- 쿠키, 세션등의 값을 변경하는 경우
- API, 파일 등 외부 서비스를 호출하는 경우
- Console.log 등 표준 입출력을 사용한 경우
- 브라우저 Windows 함수를 호출하는 경우

![output1](./images/output1.png)

#### 부작용 함수

- 인자값이 없는데 반환값이 있는 경우
- 인자값이 있는데 반환값이 없는 경우
- 인자값과 반환값 둘 다 없는 경우
- async 가 선언된 경우

![inout1](./images/inout1.png)


부수 효과가 없다는 것
- 인자값과 반환값 둘 다 있으면서
- async 가 없는 경우

단위 테스트에 적합한 함수     


## 실제 예제

```ts

if (fields.find(({ tagName: tempTagName }) => tempTagName === parsedTagName)){
    showNotification();

    return;
}
```

외부에 영향을 주는 부작용까지는 함수 추출의 대상이 아니다.
부작용을 제외한 나머지 부분만 함수 추출의 대상이 된다.
EventHandler, ViewComponent 등 부작용을 다루기 위한 계층에서 부작용 함수와 순수 함수를 연결시킨다.
# 3. 좋은 함수 만들기 - 선언형

- 명령형 (Imperative) = 절차형 = **구체적**
  - 프로그램의 상태를 변경하는 명령문을 사용하는 프로그래밍 패러다임
- 선언형 (Declarative) = 기능적 = **추상적**
  - 제어 흐름을 설명하지 않고 계산 논리를 표현하는 프로그래밍 패러다임

핵심은 
- 구현부를 외부에 드러내지 않는다.

추상화는 더 높은 수준의 개념에 대해 이야기하기 위해 핵심 세부 사항을 제거하는 것이다.  

구현이 변경 되면 **함수명을 비롯해 많은 부분이 변경이 필요하다**.



```ts
function getMainTitle(): string | null {
  const main = document.getElementById('main')
  if (main !== null) {
    const title = main.querySelector('.title')
    if (title !== null) {
      const text = title.querySelector<HTMLElement>('.title-text')
      if (text !== null) {
        return text.innerText
      } else {
        return null
      }
    } else {
      return null
    }
  } else {
    return null
  }
}
```

```ts
function getMainTitle(): string | null {
  return document.getElementById('main')
    ?.querySelector('.title')
    ?.querySelector<HTMLElement>('.title-text')
    ?.innerText
}
```

## 참고자료

- https://www.toptal.com/software/declarative-programming
- https://medium.com/@zach-gollwitzer/imperative-vs-declarative-programming-procedural-functional-and-oop-b03a53ba745c
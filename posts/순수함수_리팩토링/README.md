# 순수 함수로 관리하기

예를 들어 함수형 프로그래밍의 기준은 무엇일까?

* 함수 체이닝을 하고 있으면 우리는 함수형 프로그래밍을 하고 있는 것일까?
* 고차함수, 모나드 등 함수형 프로그래밍의 여러 개념들을 쓰고 있으면 함수형 프로그래밍을 하고 있는 것일까?
* 함수를 인자 (Arguments)로 넘겨주고, 반환 (return) 하고 있으면 함수형 프로그래밍을 하고 있는 것일까?

함수형 프로그래밍에서 가장 중요한 것은 **순수 함수(Pure Function)** 이다. 

* [What is Functional Programming?](https://www.guru99.com/functional-programming-tutorial.html) 

함수형 프로그래밍에서는 크게 3가지 요소를 구분하는 것이 중요하다.

* 부수효과 함수
* 순수 함수
* 데이터


순수 함수란 부수효과 (Side Effect) 가 없는 함수를 이야기한다.
순수 함수와 순수하지 않은 함수를 적절하게 구분해서 프로그래밍하고 있지 않다면 함수형 프로그래밍을 하고 있다고 보기는 어렵다.

 


 

부수효과 함수는 호출함수까지 부수효과로 오염시킨다.

 

암묵적 입력과 암묵적 출력

인자가 아닌 모든 입력은 암묵적 입력

* 전역 변수에서 가져온 값
* 쿠키나 외부 API 에서 가져온 값
* Dom 에서 꺼내온 값

 
리턴값이 아닌 모든 출력은 암묵적 출력

* console.log
* API, 데이터베이스 등 원격 서비스 호출
* Dom 변경


## 부수효과 기능

* Browser APi
  * `alert` 등
* 외부에 영향을 주는 함수 호출
  * `console.log` 등
  * API 호출
* 호출할때마다 변경되는 값
  * `new Date()` 등
* 전역 변수 사용
  * 언제 어디서 변경될지 모르는 전역 변수에 대한 조회/변경
* 변경 가능한 상태에 대한 참조
  * 변경 가능한 변수, 객체의 속성 등 조회
* 상태 변경
  * 모든 변수, 객체 속성 변경
  * 객체 속성 삭제 

함수형을 잘 지원하지 않는 JS/TS에서는 **모든 값을 불변으로 다루는 것에는 번거로움이 있다**.  
특히 언어의 기본 기능으로는 deep copy가 되지 않아서 `lodash.cloneDeep` 를 사용해야한다.  
함수형을 지원하는 Clojure, Scala, Haskell 등에서는 불변 객체를 언어의 기본 기능으로 지원한다.  
JS/TS 에서는 그래서 불변 객체/변수를 100% 유지하는 것에 대해서는 고민이 많다.
## 멱등성


## 부수효과 함수에서 순수함수 분리하기


예를 들어 다음과 같은 코드가 있을때 이들을 어떻게 

### 
```ts
// Course.tsx
export default function Course() {
  ...
  useEffect(() => {
    if (isIos(navigator.userAgent, document) || isSafari(navigator.userAgent)) {
      const mode = appConfig.MODE;

      const domain = getCookieDomain(mode);

      Cookies.set('CloudFront-Is-Apple-Viewer', 'true', {
        domain: domain,
      });
    }
  }, []);
}
```

to-be
```ts
useEffect(() => {
    const originCookie = Cookies.get('CloudFront-Is-Apple-Viewer');
    const {cookieValue, cookieDomain} = parseCookie(originCookie);

    Cookies.set('CloudFront-Is-Apple-Viewer', getValue(cookieValue), getDomain(cookieDomain));
  }, []);
```

as-is
```ts
  const goBackPage = useCallback((slug = '') => {
    if (category === 'question') {
      navigate(`/${ courseSlug ? 
      `course/${courseSlug}/community?type=question` 
      : 'community/questions'
        }`
      );

      return;
    }

    if (category === 'chat') {
      navigate(`${ courseSlug ? 
      `course/${courseSlug}/community?type=chat` 
      : 'community/chats'
        }`
      );

      return;
    }

    if (category === 'study') {
      navigate(`/${ courseSlug ? 
      `course/${courseSlug}/community?type=study` 
      : 'community/studies'
        }`
      );

      return;
    }

      throw new Error('유효하지 않은 category 입니다.!');
    },
    [category]
  );
```

as-is
```ts
  const handleCancel = useCallback(() => {
    invariant(editorRef.current?.getContent, '에디터가 존재하지 않습니다.');

    const { title, tags, tag } = methods.getValues();

    const parsedTitle = filterEnter(title).trim();
    const parsedTags = tags.map(({ tagName }) => tagName);
    const parsedTag = tag.trim();
    const parsedBody = filterParagraphTag(editorRef.current.getContent());

    if (parsedTitle !== '' || parsedTags.length !== 0 || parsedTag !== '' || parsedBody !== '') {
      handleOpenModal(goBackPostPage);

      return;
    }

    goBackPostPage();
  }, [category, editorRef]);
```
# if문 정리하기


기획, 사용자 스토리 그대로 코드를 옮기지 말 것.

## Default Parameter

## return with boolean

```ts
  const canBeSelected = useCallback(
    (value) => {
      if (selectedJobs.has(value)) {
        return true;
      }

      if (selectedJobs.size !== LIMIT_OF_SELECTING_JOBS) {
        return true;
      }

      return false;
    },
    [selectedJobs]
  );
```

```ts
  const canBeSelected = useCallback(
    (value) => {
      if (selectedJobs.has(value)) {
        return true;
      }

      return selectedJobs.size !== LIMIT_OF_SELECTING_JOBS;
    },
    [selectedJobs]
  );
```

## Early Exit (Guard Clauses)

컴퓨터 프로그래밍에서 가드는 해당 분기에서 프로그램 실행을 계속하려면 참으로 평가되어야 하는 부울 표현식이다.

```ts
private doSomething() {
    if (everythingIsGood()) {

        /*
         * Lots and lots of code here!!!
         */

        return SOME_VALUE;
    } else {
        return ANOTHER_VALUE;  // a special case
    }
}
```

```ts
private  doSomething() {
    if (!everythingIsGood()){ // <-- this is your guard clause
        return ANOTHER_VALUE;
    }
    /*
     * Lots and lots of code here!!!
     */

    return SOME_VALUE;
}
```


```ts
function calculateInsurance(userID: number){
    const user = myDB.findOne(userID);
    if(user){
      if(user.insurance === 'Allianz' or user.insurance === 'AXA'){
         if(user.nationality === 'Spain'){
            const value = /***
              Complex Algorithm
            */
            return value;
         }else{
            throw new UserIsNotSpanishException(user);
         }
      }else{
       throw new UserInsuranceNotFoundException(user);
      }
    }else{
     throw new UserNotFoundException('User NotFound!');
    }
}
```

```ts
function calculateInsurance(userID: number){
    const user = myDB.findOne(userID);
    if(!user){
      throw new UserNotFoundException('User NotFound!');
    }
    if(!(user.insurance === 'Allianz' || user.insurance === 'AXA')){
       throw new UserInsuranceNotFoundException(user);
    }
    if(user.nationality !== 'Spanish'){
       throw new UserIsNotSpanishException(user);
    }

    const value = /***
          Complex Algorithm
        */
    return value;
}
```


주요 비즈니스 로직은 항상 낮은 depth에서 수행하도록 한다.



## Null Object Pattern

중첩 조건이면서 `!=null && !=undefined` 가 함께하는 코드가 많다면 고민해볼 수 있다.

## 마무리

if문은 "기획자의 말" 을 그대로 옮긴 경우가 많다.  
개발자가 그대로 
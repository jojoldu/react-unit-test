# if문 정리하기


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

## Early Exit

주요 비즈니스 로직은 항상 낮은 depth에서 수행하도록 한다.


## 마무리

if문은 "기획자의 말" 을 그대로 옮긴 경우가 많다.  
개발자가 그대로 
# 1. React에서 MVVM을 해볼순 없을까? 

## 계층

### UI 계층

화면, 애니메이션, 사용자 입력처리 등 UI에 관한 처리를 담당하는 계층

#### View

* UI 화면 표시
* 사용자 입력

**플랫폼에 종속적**인 작업들을 담당한다.  
브라우저 API 등을 사용하는 경우를 의미한다.  
단위 테스트가 어렵다.


#### Presenter (혹은 ViewModel)

* View 관점의 비즈니스 로직을 담당

플랫폼에는 직접적으로 종속되지는 않는다.  
그래서 **JS 환경안에서 단위 테스트가 가능해야한다**.

### 도메인 계층

실제 많은 서비스들에서 핵심 도메인 로직들은 **서버에서 관리**될때가 많아서 굳이 도메인 계층을 유지하기 위해 억지로 구분지을 필요는 없다.  
클라이언트에서 도메인 계층은 **Optional**할 수 있다.

#### Use Case

* 도메인 관점의 비즈니스 로직 계층

#### Model (Domain Model)

* App의 논리적인 Entity 데이터

#### Translator

* 데이터 계층의 Entity <-> Domain Model 변환 계층


### 데이터 계층

#### Repository

* Use Case가 호출하는 데이터 계층
* DataSource 계층을 인터페이스 형태로 참조해서 DataSource 가 변경되어도 **Use Case 계층에 변화가 전파되지 않도록** 계층 격리를 담당한다.
  * 로컬 DB 접근 -> API 호출로 변경되어도 Repository가 호출하는 DataSource 계층만 교체되도록 한다.

#### DataSource

* 실제 데이터 입출력 계층

#### Entity

* DataSource 에서 사용되는 데이터를 정의한 모델
* HTTP API의 요청/응답을 위한 JSON, 로컬 DB 테이블을 표현하는 Class 등

## UI 계층

### 대원칙 (MVx)

![mv패턴](./images/mv%ED%8C%A8%ED%84%B4.png)

* 어떤 경우든 **Model은 분리 되어야 한다**
  * 적어도 데이터 계층 (로컬 DB, API 호출) 에서 처리되는 모든 로직은 **UI계층에서 독립적**이어야 한다
* View의 역할을 할 수 있는 한 분리시커야한다.

### MVP (Model View Presenter)

> [MVC 패턴 vs MVP 패턴](https://www.baeldung.com/mvc-vs-mvp-pattern)

* 2006년 마틴파울러의 [GUI Architectures](https://martinfowler.com/eaaDev/uiArchs.html) 를 통해 널리 알려짐
* View는 비즈니스 로직에 관련된 부분을 관여하지 못하도록 분리하고 Presenter로 넘긴다.

![mvp](./images/)


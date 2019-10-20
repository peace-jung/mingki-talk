# mingki-talk API Statement

모든 데이터는 JSON(application/json) 형식으로 전송



### 회원가입

#### POST /instagram/user/signup

| Key         | Data Type | Desc.         |          |
| :---------- | :-------- | :------------ | -------- |
| userId      | string    | ID            | Not Null |
| userPw      | string    | PW            | Not Null |
| name        | string    | 이름          | Not Null |
| phone       | string    | 전화번호      |          |
| profile_img |           | 프로필 이미지 |          |
| title       | string    | 소개 ?        |          |
| birthday    |           | 생일          |          |



### 로그인

#### POST /instagram/user/login

| Key    | Data Type | Desc. |          |
| :----- | :-------- | :---- | :------- |
| userId | string    |       | Not Null |
| userPw | string    |       | Not Null |

#### Return

{
	"result": "success",
	"data": [{ id, name, phone, profile_img, title, birthday }]
}





## 아래는 삭제

### POST /api/user

User 에 대한 api 정의

#### 회원가입

| Request Parameter | Data Type               | Desc.           | Example                                                      |
| :---------------- | :---------------------- | :-------------- | :----------------------------------------------------------- |
| method            | string                  | "INSERT" 입력   | body: {<br />  method: "INSERT",<br />  sevice: "USERINFO",<br />  id: "aaaa",<br />  password: "aaaa",<br />  name: "ssss",<br />  phone: "123123" <br />} |
| sevice            | string                  | "USERINFO" 입력 |                                                              |
| id                | string (max length: 20) |                 |                                                              |
| password          | string                  |                 |                                                              |
| name              | string (max length: 20) |                 |                                                              |
| phone             | string (max length: 20) |                 |                                                              |

#### 로그인

| Request Parameter | Data Type |      Desc.      | Example                                                      |
| :---------------: | :-------: | :-------------: | :----------------------------------------------------------- |
|      method       |  string   |  "SELECT" 입력  | body: {<br /> "method": "SELECT",<br /> "service": "USERINFO",<br /> "userId": "admin",<br /> "password": "admin"<br />} |
|      sevice       |  string   | "USERINFO" 입력 |                                                              |
|      userId       |  string   |                 |                                                              |
|     password      |  string   |                 |                                                              |

#### 유저 검색 (id 검색 / phone 검색)

| Request Parameter | Data Type | Desc.          | Example                                                      |
| :---------------- | :-------- | :------------- | :----------------------------------------------------------- |
| method            | string    | "SELECT" 입력  | body: {<br />  method: "SELECT",<br />  sevice: "SEARCH",<br />  type: "phone",<br />  value: "01012341234" <br />} |
| sevice            | string    | "ALLUSER" 입력 |                                                              |
| type              | string    | id 또는 phone  |                                                              |
| value             | string    |                |                                                              |

 

 

### POST /api/friend

Friend 에 대한 api 정의

#### 친구 추가

| Request Parameter | Data Type | Desc.             | Example                                                      |
| :---------------- | :-------- | :---------------- | :----------------------------------------------------------- |
| method            | string    | "INSERT" 입력     | body: {<br />  method: "INSERT",<br />  sevice: "ADD_FRIEND",<br />  my_id: "peace",<br />  f_id: "mingki" <br />} |
| sevice            | string    | "ADD_FRIEND" 입력 |                                                              |
| my_id             | string    | 내 ID             |                                                              |
| f_id              | string    | 친구 ID           |                                                              |

#### 친구 조회

| Request Parameter | Data Type | Desc.                  | Example                                                      |
| :---------------- | :-------- | :--------------------- | :----------------------------------------------------------- |
| method            | string    | "SELECT" 입력          | body: {<br />  method: "INSERT",<br />  sevice: "ADD_FRIEND",<br />  my_id: "peace" <br />} |
| sevice            | string    | "GET_FRIEND_LIST" 입력 |                                                              |
| my_id             | string    | 내 ID                  |                                                              |

 

 
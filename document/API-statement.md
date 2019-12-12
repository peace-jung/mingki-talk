# mingki-talk API Statement

모든 데이터는 JSON(application/json) 형식으로 전송



## 계정

### 회원가입

#### POST /instagram/user/signup

| Key             | Data Type  | Desc.             |          |
| :-------------- | :--------- | :---------------- | -------- |
| userId          | string     | ID                | Not Null |
| userPw          | string     | PW                | Not Null |
| name            | string     | 이름              | Not Null |
| phone       | string | 전화번호      |          |
| profile_img | 미정 | 프로필 이미지 |          |
| title       | string | 소개글       |          |
| birthday    | timestamp | 생일          |          |

Return

```
{
	result: 'success',
	resultCode: 200,
	message: '사용자 추가 완료'
}
```

```
// 에러는 다 이런식으로 보낼 예정
{
	error: 'You Fired', // String
	code: err.code, // Number
	message: '니가 잘못해서 에러났어' // String
}
```

| Code | 원인               |
| ---- | ------------------ |
| 200  | 성공               |
| 400  | 파라미터 확인 필요 |
| 409  | 아이디 중복        |
| 500  | 서버 문제          |



### 로그인

#### POST /instagram/user/login

| Key    | Data Type | Desc. |          |
| :----- | :-------- | :---- | :------- |
| userId | string    |       | Not Null |
| userPw | string    |       | Not Null |

Return

```
{
	result: "success",
	resultCode: 200,
	data: [{ id, name, phone, profile_img, title, birthday }]
}
```

| Code | 원인               |
| ---- | ------------------ |
| 200  | 성공               |
| 400  | 파라미터 확인 필요 |
| 4041 | 아이디 없음        |
| 4042 | 비밀번호 틀림      |
| 500  | 서버 문제          |



## 게시글

### 메인 화면에 보여줄 게시글 가져오기 (페이징 아직 안됨)

#### GET /instagram/post/main?userId=아이디

```
{
    "result": "success",
    "resultCode": 200,
    "resultData": [
        {
            "created": "1573228968559",
            "id": "a",
            "content": "shshshhs",
            "photos": [
                {
                    "fieldname": "file",
                    "originalname": "1572880795090.jpg",
                    "mimetype": "multipart/form-data",
                    "filename": "4ffaa280a8267f94930c1f9519a09805",
                    "size": 10636
                }
            ],
            "like": [
                "mink"
            ],
            "comment": [],
            "likecount": 1,
            "commentcount": 0
        },
        {
            "created": "1573136243158",
            "id": "a",
            "content": "fudurrjd",
            "photos": [
                {
                    "fieldname": "file",
                    "originalname": "instargram_20191020_164859.jpg",
                    "mimetype": "multipart/form-data",
                    "filename": "177be2b58504d6ab413159e5595fe84a",
                    "size": 3417444
                }
            ],
            "like": [],
            "comment": [],
            "likecount": 0,
            "commentcount": 0
        },
        {
            "created": "1573136197136",
            "id": "a",
            "content": "fjfjjdd",
            "photos": [
                {
                    "fieldname": "file",
                    "originalname": "1572880795090.jpg",
                    "mimetype": "multipart/form-data",
                    "filename": "5dcc676b470316b9181d4221a9f6875d",
                    "size": 10636
                }
            ],
            "like": [],
            "comment": [],
            "likecount": 1,
            "commentcount": 0
        }
    ]
}
```





### 특정 유저의 게시글 가져오기

#### GET /instagram/post/userId?loginId=내아이디 (중간에 userId는 알아서 가변적으로 쓰세용)

| Key     | Value  | Desc.              |
| :------ | :----- | :----------------- |
| userId  | userId | 조회할 유저 아이디 |
| loginId |        | 로그인한 아이디    |

```
http://localhost:3000/instagram/post/mink?loginId=user

{
	result: "success",
	resultCode: 200,
	data: [
		{
			"created": "1571581652117",
			"id": "mink",
			"content": "밍크으으으ㅡ으으응",
			"photo": [
				{
          "fieldname": "file",
          "originalname": "btnDrawAlertNone.png",
          "mimetype": "image/png",
          "filename": "822d4e458b8fa0dab99da3673138abef",
          "size": 903
        }
			],
			"isLike": "0" // 좋아요 안했으면 "0", 했으면 "1" (아마 1일거야)
		}
	]
}
```

| Code | 원인               |
| ---- | ------------------ |
| 200  | 성공               |
| 400  | 파라미터 확인 필요 |
| 404  | 없는 유저          |
| 500  | 서버 문제          |



### 특정 유저의, 특정 게시글 가져오기

#### GET /instagram/post/userId/postId?loginId=user (중간에 userId, postId는 알아서 가변적으로 쓰세용)

| Key     | Value   | Desc.                                       |
| :------ | :------ | :------------------------------------------ |
| userId  | userId  | 조회할 유저 아이디                          |
| postId  | created | 게시글 아이디 (게시글 등록일자의 timestamp) |
| loginId |         | 로그인한 아이디                             |

```
http://localhost:3000/instagram/post/mink/1572882156840?loginId=user

{
	result: "success",
	resultCode: 200,
	data: [
		{
			"created": "1571581652117",
			"id": "mink",
			"content": "밍크으으으ㅡ으으응",
			"photo": [
				{
          "fieldname": "file",
          "originalname": "btnDrawAlertNone.png",
          "mimetype": "image/png",
          "filename": "822d4e458b8fa0dab99da3673138abef",
          "size": 903
        }
			],
			"isLike": "0", // 좋아요 안했으면 "0", 했으면 "1" (아마 1일거야)
      "like": [],
      "comment": [],
      "likecount": 0,
      "commentcount": 0
		}
	]
}
```

| Code | 원인               |
| ---- | ------------------ |
| 200  | 성공               |
| 400  | 파라미터 확인 필요 |
| 404  | 없는 유저          |
| 500  | 서버 문제          |



### 게시글 쓰기

#### POST /instagram/post

| Key     | Data Type              | Desc. |          |
| :------ | :--------------------- | :---- | :------- |
| userId  | string                 |       | Not Null |
| content | string                 |       | Not Null |
| photo   | file (key) / multipart | max 5 | Not Null |

```
{
	result: 'success',
	resultCode: 200,
	message: '데이터 삽입 성공'
}
```

| Code | 원인               |
| ---- | ------------------ |
| 200  | 성공               |
| 400  | 파라미터 확인 필요 |
| 404  | 없는 유저          |
| 500  | 서버 문제          |



## 검색

### 유저 ID 로 유저 정보 가져오기

#### GET /instagram/user/detail?userId=검색할아이디&myId=로그인된아이디

요청한 유저 ID 가 100% 일치해야 정보를 준다. (유사 단어 X)

로그인한 유저가 팔로우 중인지 유무도 보내준다.

```
예시>
GET /instagram/user/detail?userId=user2&myId=user1

리턴>
{
    "result": "success",
    "resultCode": 200,
    "message": "사용자의 정보를 가져왔습니다.",
    "resultData": {
        "id": "user2",
        "name": "김창수",
        "phone": null,
        "profile_img": null,
        "title": null,
        "birthday": null,
        "following": true, // user1 이 user2 를 팔로우 했는지
        "followingCount": "0", // user2 의 팔로잉 수
        "followerCount": "2" // user2 의 팔로워 수
    }
}
```



### 유저 ID 또는 이름으로 검색 (유사 단어 포함)

#### GET /instagram/search?query=검색할내용

(검색은 현재는 유저 아이디/이름으로만 검색을 하고있고, 추후 태그를 개발한다면 태그도 검색할 수 있을 예정)

```
예시>
GET /instagram/search?query=김철수

리턴>
{
    "count": 1, // 검색된 갯수
    "resultData": {
        "user": [
            {
                "id": "user1",
                "name": "김철수",
                "profile_img": null
            }
        ], // 유저일때는 id, name, profile_img 를 주겠음. 화면에서 이거면 되겠지?
        "tag": [] // 아직 없음. 그냥 빈배열 줄거임
    },
    "resultCode": 200
}
```



## 팔로우

### 팔로우/팔로워 조회

#### GET /instagram/follow?query=[following or follower]&userId=아이디

```
예시>
GET /instagram/follow?query=following&userId=user1 // 팔로우 조회 (내가 상대방을 팔로우, user1이 팔로우하는 사람 조회)
GET /instagram/follow?query=follower&userId=user2 // 팔로워 조회 (나를 팔로우하는 사람이 팔로워, user2를 팔로우 하는 사람 조회)

리턴>
// 팔로우 조회 결과
{
    "result": "success",
    "resultCode": 200,
    "resultData": [
        {
            "following": "user2"
        }
    ],
    "count": 1
}
// 팔로워 조회 결과
{
    "result": "success",
    "resultCode": 200,
    "resultData": [
        {
            "follower": "user1"
        }
    ],
    "count": 1
}
```



### 팔로우 (내가 상대방을 팔로우)

#### POST /instagram/follow

| Key    | Data Type | Desc.                |          |
| :----- | :-------- | :------------------- | :------- |
| user   | string    | 내 아이디            | Not Null |
| friend | string    | 팔로우할 유저 아이디 | Not Null |

```
{
    "result": "success",
    "resultCode": 200,
    "resultData": [
        {
            "follow": "user2"
        }
    ],
    "count": 1
}
```



###팔로우 취소 (내가 상대방을 팔로우 취소)

#### POST /instagram/follow/remove

| Key    | Data Type | Desc.                |          |
| :----- | :-------- | :------------------- | :------- |
| user   | string    | 내 아이디            | Not Null |
| friend | string    | 팔로우할 유저 아이디 | Not Null |

```
{
    "result": "success",
    "message": "success message"
}
```



## 좋아요

### 좋아요 하기/취소하기

#### POST /instagram/post/like

| Key           | Data Type | Desc.                  |          |
| :------------ | :-------- | :--------------------- | :------- |
| userId        | string    | 내 아이디              | Not Null |
| contentUserID | string    | 게시글의 userId        | Not Null |
| contentDataId | string    | 게시글의 created       | Not Null |
| like          | boolean   | 추가할지 취소할지 여부 | Not Null |

```
{
    result: 'success',
    resultCode: 200,
    messgae: '처리되었습니다.'
}

{
    "error": "already like",
    "code": 401,
    "message": "이미 좋아요 했음"
}
```



## 댓글

### 댓글 조회하기

#### GET /instagram/comment?owner=아이디&postId=340853095 (예시)

| Key    | Data Type | Desc.             |          |
| :----- | :-------- | :---------------- | :------- |
| owner  | string    | 게시글 쓴 유저 id | Not Null |
| postId | bigint    | 게시글의 created  | Not Null |

```
{
    "result": "success",
    "resultCode": 200,
    "resultData": [
        {
            "owner": "a",
            "postId": "1573228968559",
            "userId": "user1",
            "content": "좋아요",
            "created": "1575901709046"
        }
    ]
}

{
    error: 'Get Comment ERROR',
    code: 500,
    message: '몰라 DB관리자한테 물어봐'
};
```



### 댓글 등록하기

#### POST /instagram/comment/add

| Key     | Data Type | Desc.                 |          |
| :------ | :-------- | :-------------------- | :------- |
| owner   | string    | 게시글 쓴 유저 id     | Not Null |
| postId  | bigint    | 게시글의 created      | Not Null |
| userId  | string    | 댓글 쓰는 유저 아이디 | Not Null |
| content | string    | 댓글 내용             | Not Null |

```
{
    result: 'success',
    resultCode: 200,
    message: '댓글 등록 성공'
}

{
    error: 'Add Comment ERROR',
    code: 500,
    message: '몰라 DB관리자한테 물어봐'
}
```


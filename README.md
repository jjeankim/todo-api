# ✏️ Todo List API Server

간단한 할 일 관리 앱의 백엔드 API 서버입니다.
MongoDB와 Express를 기반으로 API를 제공합니다.

<br/>

## 🖥️ 배포 링크 (Render)

🔗 https://todo-api-3yui.onrender.com

<br/>

## ⚙️ 기술 스택

**Back-End**

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=black)
![Express](https://img.shields.io/badge/Express-888888?style=for-the-badge&logo=express&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Backend on Render](https://img.shields.io/badge/Backend_on-Render-0099FF?style=for-the-badge&logo=render&logoColor=white)

<br/>

## 🔨 사용 라이브러리 및 도구
![Dotenv](https://img.shields.io/badge/dotenv-000000?style=for-the-badge)
![CORS](https://img.shields.io/badge/cors-7D4698?style=for-the-badge)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Nodemon](https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge)

<br/>

## 📦 설치 및 실행

01 아래의 명령어로 의존성을 설치합니다.
```
npm install
```
02 아래의 명령어로 개발 서버를 실행합니다.
```
npm run dev
```

<br/>

## 📡 API 문서 요약
| 메서드    | 경로              | 설명           |
| ------ | --------------- | ------------ |
| GET    | /tasks      | 전체 할 일 목록 조회 |
| POST   | /tasks      | 새로운 할 일 생성   |
| PATCH  | /tasks/\:id | 할 일 상태 토글    |
| DELETE | /tasks/\:id | 할 일 삭제       |

<br />

## 🔐 환경 변수 (.env 예시)

프로젝트 루트에 .env 파일을 생성하고 아래와 같이 작성하세요. .env 파일은 gitignore에 추가해 버전 관리에서 제외하세요.
```
DATABASE_URL ="mongodb+srv://<username>:<password>@cluster0.fro8q.mongodb.net/<database>?retryWrites=true&w=majority&appName=Cluster0"
```

<br />

## 🌐 CORS 설정

현재 백엔드에는 다음 두 origin만 요청을 허용하도록 설정되어 있습니다. 필요 시 특정 origin만 허용하도록 수정할 수 있습니다.
```
- http://localhost:3000 (개발용)
- https://todo-list-jjeankim.netlify.app (배포된 프론트엔드)

```

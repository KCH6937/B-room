![broom-logo](https://user-images.githubusercontent.com/77667889/181674803-70197c69-9bdb-41c0-93c7-9822ced7b9c8.png)
## _HR 데이터를 쉽고 편하게!_

<br/>

프로젝트명 : B-room <br/>
배포 링크 : -

<br/><br/><br/>

# Ⅰ. 프로젝트 소개

> 근태, 부서 관리, 메신저까지.

> 협업에 필요한 모든 데이터

> B-room 하나면 충분합니다!

<br/><br/>

##### 기획 의도

- 기존에 사용 중이던 원티드 스페이스 앱 어플리케이션을 바탕으로 웹 어플리케이션 서버를 구현
- 메신저 등 추가 기능 제공

<br/><br/><br/>

# Ⅱ. 사용 기술

Back-End : ![node](https://img.shields.io/badge/-node.js-sucsess) ![express](https://img.shields.io/badge/-express-gray) ![socket-io](https://img.shields.io/badge/-socket.io-black) ![type-script](https://img.shields.io/badge/-TypeScript-blue)

Database : ![MySQL](https://img.shields.io/badge/-MySQL-00758F) ![TypeORM](https://img.shields.io/badge/-TypeORM-D941C5)

Cloud : ![NGINX](https://img.shields.io/badge/-NGINX-0D974D) ![ec2](https://img.shields.io/badge/-AWS_EC2-FF9900)
![docker](https://img.shields.io/badge/-DOCKER-0db7ed)

CI/CD : ![actions](https://img.shields.io/badge/-GitHub_Actions-002F67)

<br/><br/><br/>

# Ⅲ. 프로젝트 기간

1차 개발(mvp) : `2022.07.27 ~ 2022.07.29`<br/>
2차 개발(배포&리팩토링) : `2022.08.01 ~ 2022.08.05` <br/>
3차 개발(고도화) : `2022.08.08 ~ 2022.08.12`<br/>

<br/><br/><br/>

# Ⅳ. ERD
![ERD](https://user-images.githubusercontent.com/77667889/181674748-de0bf383-4103-42c5-aed8-750ad3eddaab.png)

<br/><br/><br/>

# Ⅴ. 프로젝트 기록

- [Broom wiki](https://github.com/team-B-free/B-room/wiki)에서 확인 할 수 있습니다.

<br/><br/><br/>

# Ⅵ. 폴더 구조
```bash
├── src             # 소스 폴더
    ├── controllers     # API 요청/응답 실행
    ├── entities        # Model과 동일
    ├── middlewares     # 사용자 지정 미들웨어
    ├── modules         # 사용자 지정 모듈
    ├── routes          # 요청에 따른 분리
    ├── services        # 데이터 가공
    └── tests           # Jest 테스팅 폴더, 이곳에 테스트 파일들이 모두 담긴다.
```

<br/><br/><br/>

# Ⅶ. B-free TEAM

|                                 **강채현**                                 |                                    **김영우**                                    |                                  **박성용**                                   |                                   **최예진**                                   |                                 **오주환**                                 |
| :------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|                   [@KCH6937](https://github.com/KCH6937)                   |                [@whoamixzerone](https://github.com/whoamixzerone)                |                 [@StarFace90](https://github.com/StarFace90)                  |                 [@chldppwls12](https://github.com/chldppwls12)                 |                   [@juhwano](https://github.com/juhwano)                   |
| <br/><img src="https://avatars.githubusercontent.com/KCH6937" width="100"> | <br/><img src="https://avatars.githubusercontent.com/whoamixzerone" width="100"> | <br/><img src="https://avatars.githubusercontent.com/StarFace90" width="100"> | <br/><img src="https://avatars.githubusercontent.com/chldppwls12" width="100"> | <br/><img src="https://avatars.githubusercontent.com/juhwano" width="100"> |

![logo](https://user-images.githubusercontent.com/77667889/182810600-0ab83562-0dac-4a40-bafd-b4da3c8b3a9d.png)

프로젝트명 : B-room <br/>
배포 링크 : http://3.39.234.35:3000/api/

<br/>

## Ⅰ. 프로젝트 소개
##### _HR 데이터를 쉽고 편하게!_
```bash
근태, 부서 관리, 메신저까지.
협업에 필요한 모든 데이터
B-room 하나면 충분합니다!
```

<br/><br/>

## Ⅱ. 요구 사항
![requirement](https://user-images.githubusercontent.com/77667889/182811383-44885afb-ed7a-4f97-a99d-7c508e368a32.png)

<br/><br/>

## Ⅲ. API 명세서
![api](https://user-images.githubusercontent.com/77667889/182811516-66269994-3021-488b-88a5-19e4a2ab6a01.png)

<br/><br/>

# Ⅳ. ERD
![ERD](https://user-images.githubusercontent.com/77667889/181674748-de0bf383-4103-42c5-aed8-750ad3eddaab.png)

<br/><br/>

## Ⅴ. 업무 분업
| 이름 | 담당 API | 담당 기능 | 코드 보러 가기 |
| :---------------: | :---------------: | :---------------: | :---------------: |
| 강채현 | /users | 사용자 | [user.service](https://github.com/team-B-free/B-room/blob/main/src/services/user/user.service.ts) |
| 김영우 | /timelog <br/> /notices | 출퇴근 <br/> 공지사항 | [timelog.service](https://github.com/team-B-free/B-room/blob/main/src/services/timelog/timelog.service.ts) <br/> [notice.service](https://github.com/team-B-free/B-room/blob/main/src/services/companyNotice/companyNotice.service.ts) |
| 박성용 | /chats | 채팅 | [chat.service](https://github.com/team-B-free/B-room/blob/main/src/services/companyChatRoom/companyChatRoom.service.ts) |
| 최예진 | /chats | 채팅 | [chat.service](https://github.com/team-B-free/B-room/blob/main/src/services/companyChatRoom/companyChatRoom.service.ts) |
| 오주환 | /holiday <br/> /department | 휴가 <br/> 부서 | [holliday.service](https://github.com/team-B-free/B-room/blob/main/src/services/holiday/holiday.service.ts) <br/> [department.service](https://github.com/team-B-free/B-room/blob/main/src/services/department/department.service.ts) |

<br/><br/>

## Ⅵ. 사용 기술

Back-End : ![node](https://img.shields.io/badge/-node.js-sucsess) ![express](https://img.shields.io/badge/-express-gray) ![socket-io](https://img.shields.io/badge/-socket.io-black) ![type-script](https://img.shields.io/badge/-TypeScript-blue)

Database : ![MySQL](https://img.shields.io/badge/-MySQL-00758F) ![TypeORM](https://img.shields.io/badge/-TypeORM-D941C5)

Cloud : ![NGINX](https://img.shields.io/badge/-NGINX-0D974D) ![ec2](https://img.shields.io/badge/-AWS_EC2-FF9900)
![docker](https://img.shields.io/badge/-DOCKER-0db7ed)

CI/CD : ![actions](https://img.shields.io/badge/-GitHub_Actions-002F67)

<br/><br/>

# Ⅶ. 프로젝트 기간

1차 개발(mvp) : `2022.07.27 ~ 2022.07.29`<br/>
2차 개발(배포&리팩토링) : `2022.08.01 ~ 2022.08.05` <br/>
3차 개발(고도화) : `2022.08.08 ~ 2022.08.12`<br/>

<br/><br/>


# Ⅷ. 프로젝트 기록

- [Broom wiki](https://github.com/team-B-free/B-room/wiki)에서 자세히 확인할 수 있습니다.

<br/><br/>

# Ⅸ. 폴더 구조
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

<br/><br/>

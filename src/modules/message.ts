const message = {
  SUCCESS: '성공',
  NULL_VALUE: '필요한 값이 없음',
  NOT_FOUND: '존재하지 않는 자원',
  BAD_REQUEST: '잘못된 요청',
  UNAUTHORIZED: '인증 안됨',
  INTERNAL_SERVER_ERROR: '서버 내부 오류',
  FORBIDDEN: '관리자만 접근 가능합니다',

  // (사용자) 회원가입 부분
  DUPLICATE_EMAIL: '이미 존재하는 이메일',

  // (사용자) 로그인 부분
  INVALID_USER_INFO: '존재하지 않는 회원정보',
  INVALID_DEPARTMENT_INFO: '존재하지 않는 부서명',

  // (Access Token) 인증 부분
  NULL_VALUE_ACEESS_TOKEN: '토큰 필요',
  ACCESS_TOKEN_EXPIRES: '토큰 만료',
  INVALID_ACCESS_TOKEN: '토큰 검증 실패'
};

export default message;

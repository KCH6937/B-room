export default {
  moduleFileExtensions: ['js', 'ts'], //테스트할 파일의 형식 지정
  testEnvironment: 'node', //테스트 환경
  transform: {
    //소스파일을 제공하기 위한 동기 함수
    '\\.ts?$': 'ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'], //정규표현식에 매칭되는 파일은 transform 이 되지 않음
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFiles: ['dotenv/config'] //.env 파일 사용
};

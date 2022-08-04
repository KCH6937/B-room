# 노드 16버전 이미지 받기
FROM node:16

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# 이미지 내에서 명령어를 실행할(현 위치로 잡을) 디렉토리 설정
WORKDIR /home/web-app

COPY package*.json ./

# 이미지 생성 과정에서 실행할 명령어 ci로 버전 일치
RUN npm i

# wait-for-it.sh
#COPY wait-for-it.sh ./
#RUN chmod +x wait-for-it.sh

COPY . .

EXPOSE 3000

# Node ENV
# ENV NODE_ENV=production
ENV NODE_ENV=development

ENTRYPOINT ["dockerize", "-wait", "tcp://db:3306", "-timeout", "25s"]

# 컨테이너 실행시 실행할 명령어
CMD ["npm", "run", "dev"]

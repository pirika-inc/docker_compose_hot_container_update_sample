FROM node:14-alpine

RUN apk add --update docker-compose git

WORKDIR /app

COPY docker-compose.yml /app/docker-compose.yml
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY tsconfig.json /app/tsconfig.json
COPY src/ /app/src
COPY service1/ /service1
COPY service2/ /service2
COPY service3/ /service3

RUN mkdir dist/
RUN npm install && npm run build

RUN rm -rf /app/src

CMD ["npm", "run", "start"]


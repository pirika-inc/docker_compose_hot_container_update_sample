FROM node:14-slim

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY tsconfig.json /app/tsconfig.json
COPY src/ /app/src

RUN mkdir dist/
RUN npm install && npm run build

RUN rm -rf /app/src
EXPOSE 8000

CMD ["npm", "run", "start"]

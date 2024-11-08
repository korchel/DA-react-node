FROM node:alpine as build

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

ARG NODE_ENV

RUN npm install

COPY . .

EXPOSE 8080

ENV NODE_ENV $NODE_ENV

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'production' ]; then npm start; else npm run dev; fi"]
FROM node:18-alpine as build
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
RUN npm run start:production

FROM nginx:stable-alpine
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /app/dist /usr/share/nginx/html/
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

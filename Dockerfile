FROM node:14 as build

WORKDIR /app

COPY ./package.json /app/

RUN npm install

COPY . /app/

RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
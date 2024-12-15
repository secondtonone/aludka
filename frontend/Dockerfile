FROM node:alpine AS build

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ARG TON_CENTER_API_CLIENT_KEY

ENV TON_CENTER_API_CLIENT_KEY=${TON_CENTER_API_CLIENT_KEY}

RUN TON_CENTER_API_CLIENT_KEY=$TON_CENTER_API_CLIENT_KEY npm run build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

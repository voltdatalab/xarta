# TODO: Test with node-alpine
FROM node:lts

ENV CADDY_CONTAINER_NAME ""
ENV REAL_HOST ""

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

COPY . .
RUN chmod +x setup-entrypoint.sh

RUN npm run build

ENTRYPOINT ["/app/setup-entrypoint.sh"]
FROM node:lts

ENV CADDY_CONTAINER_NAME ""
ENV REAL_HOST ""

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

COPY . .

RUN npm run build

CMD npm start -- --internal-container "$CADDY_CONTAINER_NAME" --real-host "$REAL_HOST"
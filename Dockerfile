FROM gcr.io/zenika-hub/alpine-chrome:with-node

USER root

RUN apk update && apk add --no-cache wget

WORKDIR /opt/webapp

COPY package.json .
COPY .env .
RUN npm install

COPY server server

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget --no-verbose --spider localhost:3000/status || exit 1

ENTRYPOINT ["node", "/opt/webapp/server/index.js"]
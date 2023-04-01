FROM node:16.15.0-alpine3.15

RUN apk add --no-cache bash

USER node

RUN mkdir -p /home/node/app
RUN chmod -R 777 /home/node/app
WORKDIR /home/node/app

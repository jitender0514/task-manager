FROM node:20-alpine

WORKDIR /usr/src/app/

COPY frontend/package*.json /usr/src/app/
RUN npm install

COPY ./frontend /usr/src/app/

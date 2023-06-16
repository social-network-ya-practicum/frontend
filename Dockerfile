FROM node:20-alpine3.17 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD cp -r build result_build

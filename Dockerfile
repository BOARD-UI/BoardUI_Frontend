# Step 1

FROM node:12-alpine as build-step

ENV PORT 80

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD ["npm", "start"]
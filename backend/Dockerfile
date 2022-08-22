FROM node:12-alpine as backend

RUN mkdir -p /app

WORKDIR /app

COPY /package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
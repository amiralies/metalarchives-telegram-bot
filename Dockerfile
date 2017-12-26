FROM node:carbon-alpine

WORKDIR /var/www/metalarchives-telegram-bot
COPY package*.json ./
RUN npm install
COPY . .
CMD npm start

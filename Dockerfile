FROM node:carbon-alpine

WORKDIR /var/www/metalarchives-telegram-bot
COPY package*.json ./
RUN npm install -g pm2 
RUN npm install
COPY . .
CMD pm2-docker --format process.json

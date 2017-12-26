FROM node:carbon-alpine

WORKDIR /var/www/metalarchives-telegram-bot
COPY package*.json ./
RUN npm install -g pm2 
RUN npm install
COPY . .
CMD sleep 1s && pm2-docker --format process.json

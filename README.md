MetalArchives Telegram Bot
======
Telegram Bot for metal-archives.com written in NodeJS.

How to run
-------
1. Make sure you have nodejs, mongodb, redis and git installed.

2. Run the API:
[See instructions ](https://github.com/amiralies/metalarchives-api)

3. Clone the repo:
```sh
git clone https://github.com/amiralies/metalarchives-telegram-bot.git
```

4. Install dependencies :
```sh
cd metalarchives-telegram-bot
npm install
```

5. Set env vars (do changes if necessary) :
```sh
export BOT_TOKEN=<bot_token>
export BOT_USERNAME=<bot_username>
export API_URL=http://localhost:3000

export MONGO_URL=mongodb://mongodb:27017/metalarchives-bot

export REDIS_URL=redis://localhost:6379
#if you prefer local session
export LOCAL_SESSION=true
```

6. Start the bot :
```sh
npm start
#or if you prefer pm2
pm2 start process.json
```
7. Done.

Docker (Recommended)
-------
1. Make sure you have docker and docker-compose installed.
2. Make a directoy where you want to put your api and bot files (We go with `MetalArchives` here.
```sh
mkdir MetalArchives
cd MetalArchives
```
3. Clone [metalarchivlses-api](https://github.com/amiralies/metalarchives-api) and this repo (bot).
```sh
git clone https://github.com/amiralies/metalarchives-api
git clone https://github.com/amiralies/metalarchives-telegram-bot
```
4. Copy docker-compose.yml from `metalarchives-telegram-bot` dir to its parent (`MetalArchives`) and put your bot token inside that:
```sh
cp metalarchives-telegram-bot/docker-compose.yml docker-compose.yml 
#edit the file docker-compose.yml with your desired editor.
#find the line which has BOT_TOKEN=<bot token goes here> and put your bot token 
#save the file
```
5. Run with docker compose:
```sh
docker-compose up
#note if you want to dont run catchDB script of metalarchives-api on start try with
DB_CATCH=false docker-compose up
```
6. Done! (you dont need to install dependencies manually , easy huh?)

# Novity Slack

![](https://github.com/heryTz/novity-slack/blob/main/demo.gif)

⚠️ Authentication is password less. The otp code is in the terminal

## Setup with docker

The easiest way is to use docker.

```bash
docker compose up
```

## Setup without docker

Setup **front**

```bash
cd front
yarn install
yarn dev
```

Setup **back**

```bash
cd back
yarn install
npx prisma migrate reset -f --skip-seed
npx prisma db push
npx prisma db seed
yarn start:dev
```

## Application host

- front: http://localhost:5173
- back: http://localhost:3000
- doc api: http://localhost:3000/api

## TODO

- [x] All realtime message

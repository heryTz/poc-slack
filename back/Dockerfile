FROM node:20-alpine as base

FROM base as deps
WORKDIR /app  
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

FROM base as dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env-docker .env
EXPOSE 3000
RUN npx prisma migrate reset -f --skip-seed && \
    npx prisma db push && \
    npx prisma db seed && \
    npx prisma generate
CMD [ "yarn", "start:dev" ]

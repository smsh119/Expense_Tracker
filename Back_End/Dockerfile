FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production \
    && yarn cache clean

COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "index.js"]
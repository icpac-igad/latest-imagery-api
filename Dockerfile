FROM node:10-alpine

WORKDIR /app

COPY . /app/

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]
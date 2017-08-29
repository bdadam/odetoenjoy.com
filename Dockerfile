FROM node:8.2.1-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 8229

RUN mkdir -p /app
WORKDIR /app
COPY package.json yarn.lock /app/

RUN yarn install && yarn cache clean

COPY . /app

RUN npx webpack --no-colors
# RUN npx jest --ci --color=false+

CMD [ "node", "dist/server.webpacked.js" ]

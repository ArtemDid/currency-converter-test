FROM node:16.13.0

WORKDIR /app

COPY package.json /app

RUN npm i

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

ENV PORT=3000

EXPOSE $PORT

CMD ["npm", "run", "start"]
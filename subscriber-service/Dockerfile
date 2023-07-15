FROM node:12.16.1-alpine3.11

WORKDIR /app

COPY ./srcs .

RUN npm i dotenv
RUN npm i

CMD ["node", "subscriber.js"]
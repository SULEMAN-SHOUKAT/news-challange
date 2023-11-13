FROM node:18 as build

WORKDIR /app

COPY ./dist ./static
COPY ./server ./
COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "server.js"]
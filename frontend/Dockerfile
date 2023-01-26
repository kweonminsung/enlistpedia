FROM node:16.16.0

WORKDIR /frontend

COPY ./ ./

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:prod"]
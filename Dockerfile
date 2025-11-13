FROM node

WORKDIR /app

COPY package*.json .

COPY ./destination/ ./

RUN npm ci

EXPOSE 8000

CMD ["npm", "start"]
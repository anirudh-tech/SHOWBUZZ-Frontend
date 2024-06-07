FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]
FROM node:16.18

WORKDIR /SubPjt2/frontend/

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
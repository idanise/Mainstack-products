FROM node:latest

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json* ./
# COPY ./src ./src

COPY . .


RUN npm install

# COPY dist/ ./

EXPOSE 3000

# CMD ["node", "index.js"]

CMD ["npm", "start"]


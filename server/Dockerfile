FROM node:14.15.4-alpine

RUN mkdir -p /app/config /app/src
WORKDIR /app
COPY tsconfig.json /app/tsconfig.json
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY dist/ /app/dist/

RUN npm install

CMD ["npm", "start"]
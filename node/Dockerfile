FROM node:20-alpine AS BUILD

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM node:20-alpine

ENV NODE_ENV production

COPY --from=BUILD /usr/src/app/secrets/ /run/secrets/

WORKDIR /usr/src/app

COPY --from=BUILD /usr/src/app/package*.json .

RUN npm ci --only=production

USER node

COPY --from=BUILD --chown=node:node /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/app.js"]

FROM node:16.15.0-alpine3.15 AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:16.15.0-alpine3.15 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production --omit=dev
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:dev api"]
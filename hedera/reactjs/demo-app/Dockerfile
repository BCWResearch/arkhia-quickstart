FROM node:16-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003

FROM base AS dev
CMD ["npm", "run", "start:dev"]

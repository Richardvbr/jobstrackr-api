# Stage 1: Build project
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create production image
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/app.js"]

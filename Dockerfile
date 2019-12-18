# --- Base node ---
FROM node:alpine as base
RUN apk add --no-cache --virtual .gyp python make g++
WORKDIR /usr/src/app
COPY package.json .

# --- Dependencies ---
FROM base AS dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules
RUN npm install
RUN apk del .gyp

# --- Build ---
FROM dependencies AS build
COPY src ./src
COPY config ./config
COPY tsconfig.json .
COPY gulpfile.js .
RUN npm run build

# --- Release ---
FROM base AS release
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build
COPY config ./config

# --- Entrypoint command ---
CMD npm run start
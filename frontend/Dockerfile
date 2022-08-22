FROM node:16.10.0 as frontend

# CREATE an app directory
RUN mkdir -p /app

# SET workdir
WORKDIR /app

# COPY lock files
COPY /frontend/package*.json ./
COPY /frontend/yarn.lock ./

# Install Node
RUN yarn install

# COPY REST
COPY frontend/ .

# Build app
RUN yarn run build

ENV PORT 80

EXPOSE 80

# START
CMD ["yarn", "install", "-g", "serve"]
CMD ["serve", "-s", "build"]
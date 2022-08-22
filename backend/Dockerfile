FROM node:16.4.2 as backend

# CREATE an app directory
RUN mkdir -p /app

# SET workdir
WORKDIR /app

# COPY lock files
COPY /backend/package.json ./
COPY /backend/yarn.lock ./

# Install Node
RUN yarn install

# COPY REST
COPY backend/ ./

ENV PORT 80

EXPOSE 80

CMD ["yarn", "start"]
FROM node:16.10.0 as backend

ENV NODE_ENV production
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
RUN ls -a | xargs echo

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

COPY backend/.env ./

ENV PORT 80

EXPOSE 80

CMD ["yarn", "start"]
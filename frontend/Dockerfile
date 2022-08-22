FROM node:12-alpine as frontend

# CREATE an app directory
RUN mkdir -p /app

# SET workdir
WORKDIR /app

# COPY lock files
COPY /package*.json ./

# Install Node
RUN npm install

# COPY REST
COPY . .

# Build app
RUN npm run build

# START
CMD ["npm", "install", "-g", "serve"]
CMD ["serve", "-s", "build"]
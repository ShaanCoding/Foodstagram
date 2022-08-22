FROM node:16.4.2 as frontend

# CREATE an app directory
RUN mkdir -p /app

# SET workdir
WORKDIR /app

# COPY lock files
COPY /package*.json ./

# Install Node
RUN npm install

# COPY REST
COPY frontend/* ./

# Build app
RUN npm run build

ENV PORT 80

EXPOSE 80

# START
CMD ["npm", "install", "-g", "serve"]
CMD ["serve", "-s", "build"]
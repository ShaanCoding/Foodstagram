FROM node:16.4.2 as backend

# CREATE an app directory
RUN mkdir -p /app

# SET workdir
WORKDIR /app

# COPY lock files
COPY /package*.json ./

# Install Node
RUN npm install

# COPY REST
COPY backend/* ./

ENV PORT 80

EXPOSE 80

CMD ["npm", "start"]
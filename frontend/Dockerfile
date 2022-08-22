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

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
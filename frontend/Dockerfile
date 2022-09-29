FROM node:16.10.0 as frontend-build

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

# Get Secrets
RUN --mount=type=secret,id=ENVIRONMENT \
	cd /run/secrets && \
	for f in *; do (echo ${f}= | tr -d '\n'; cat ${f}; echo) >> .env; done && \
	cd ../../app && \
	cp ../run/secrets/.env .

# Build app
RUN yarn run build

# production environment
FROM steebchen/nginx-spa:stable

COPY --from=frontend-build /app/build /app

EXPOSE 80

CMD ["nginx"]
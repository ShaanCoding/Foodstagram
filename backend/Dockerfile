FROM node:16.10.0 as backend

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

RUN --mount=type=secret,id=DB_HOST \
	--mount=type=secret,id=DB_PASSWORD \
	--mount=type=secret,id=ENVIRONMENT \
	--mount=type=secret,id=DB_USERNAME \
	--mount=type=secret,id=BLOB_CONNECTION_STRING \
	--mount=type=secret,id=JWT_SECRET \
	--mount=type=secret,id=EMAIL_CONNECTION_STRING \
	cd /run/secrets && \
	for f in *; do (echo ${f}= | tr -d '\n'; cat ${f}; echo) >> .env; done && \
	cd ../../app && \
	cp ../run/secrets/.env .

ENV PORT 80

EXPOSE 80

CMD ["yarn", "start"]
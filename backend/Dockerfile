FROM node:16.10.0 as backend

ENV NODE_ENV production

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

RUN --mount=type=secret,id=DB_HOST \
	--mount=type=secret,id=DB_PASSWORD \
	--mount=type=secret,id=DB_NAME \
	--mount=type=secret,id=DB_USERNAME \
	cd /run/secrets && \
	ls -a && \
	for f in *; do (echo ${f}= | tr -d '\n'; cat ${f}; echo) >> .env; done && \
	ls -a && \
	cd .. && \
	ls -a && \
	cp /run/secrets/.env . && \
	ls -a

RUN ls -a | xargs echo

ENV PORT 80

EXPOSE 80

CMD ["yarn", "start"]


#export DB_HOST=$(cat /run/secrets/DB_HOST) && \
#export DB_PASSWORD=$(cat /run/secrets/DB_PASSWORD) && \
#export DB_NAME=$(cat /run/secrets/DB_NAME) && \
#export DB_USERNAME=$(cat /run/secrets/DB_USERNAME) && \
#yarn start
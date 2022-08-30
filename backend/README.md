# Setup Instructions

- Create a file called `.env` with the information given in `.envExample`

- To start

  - `yarn install`
  - `yarn start`

- To start mock REST api:
  - `npx json-server --watch db.json --port 3004` OR `yarn fake-rest`

## Docker

To build the docker image run:

```bash
	export DOCKER_BUILDKIT=1
	docker build -f backend/Dockerfile -t asd-backend .
```

To run the docker image run:

```bash
	docker run --name asd-backend -p 80:80 asd-backend
```

## FAQ

To fix vmmen using all of your ram run:

```bash
	wsl --shutdown
```

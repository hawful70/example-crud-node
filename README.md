# API with Node.js + PostgreSQL + TypeORM

# Local setup
## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Nodejs](https://nodejs.org/en)
- [Make](https://www.gnu.org/software/make/)

## Init setup (only once)

- Run infrastructure setup:

  ```sh
  make clean

  make infras
  ```

- Migrate database:

  ```sh
  make migrate

  ```

## Start server

- Start server:

  ```sh

  make dev

  ```

- API server: `http://localhost:3000/api/v1/jobs`

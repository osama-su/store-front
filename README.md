# Storefront Backend Project

A StoreFront backend API written in NodeJS for Udacity.

## Getting Started

### Setup Postgresql Database

You need to install Postgresql and create a database called "store_dev" and "store_test"

```bash
psql -U postgres             # open postgresql prompt and login as postgres
create database store_dev;   # create a database called store_dev
create database store_test;  # create a database called store_test
```

note that the port is 5432

### Installing

Simply, run the following command to install the project dependencies:

```bash
yarn
```

### Setup environment

First, create a `.env` file with all the required environment variables:

```
cp .env.example .env
```

```bash
# .env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=store_dev
DB_NAME_TEST=store_test
DB_USERNAME=postgres
DB_PASSWORD=2587

BCRYPT_PASSWORD=secret
BCRYPT_SALT=10

TOKEN_SECRET=token_secret
```

Next, you need to run the database migrations:

```bash
yarn migrate
```

## Running the application

Use the following command to run the application in watch mode:

```bash
yarn watch
```

Use the following command to run the application in using node:

```bash
yarn start
```

The application will run on <http://localhost:3000/>.

## Running the unit tests

Use the following command to run the unit tests:

```bash
yarn test
```

You may also use the Postman collection present in the repository for testing.

## Built With

- [NodeJS](https://nodejs.org/) - The JavaScript runtime
- [Yarn](https://yarnpkg.com/) - The dependency manager
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
- [Express](https://expressjs.com) - The web framework
- [TypeScript](https://www.typescriptlang.org/) - Types JS extension
- [Jasmine](https://jasmine.github.io/) - The unit testing framework

## License

This project is licensed under the ISC License - see the [LICENSE.txt](LICENSE.txt) file for details

## Acknowledgments

- The official documentation of `db-migrate`
- The official Documentation of `Jasmine`

## Endpoints

- See [REQUIREMENTS.md](./REQUIREMENTS.md) file

## Database Schema

- See [REQUIREMENTS.md](./REQUIREMENTS.md) file

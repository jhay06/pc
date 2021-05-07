## CLIB-CMS-ADMIN
CLIB ADMIN Management System Dashboard

### Prerequisites

- [React Script](https://www.npmjs.com/package/react-scripts) - 3.4.0 version
- [Node](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V14.md#14.6.0) - 14.6.0 version
- [Docker](https://docs.docker.com/docker-for-mac/install/) - 19.03.12 version
- [Docker-Compose](https://docs.docker.com/compose/install/) - 1.26.2 version


### Setup

1. `$ docker-compose run --rm clib-cms-admin yarn`
2. `$ docker-compose up --build` to launch app together with other services i.e. DB, worker servers
4. hit up localhost:5000


### Useful Commands

- When adding new yarn packages
  - `$ docker-compose run --rm clib-cms-admin yarn add <PACKAGENAME>`
- Tunnel into container
  - `$ docker-compose exec --rm clib-cms-admin /bin/sh`
- Run tests
  - `$ docker-compose run --rm clib-cms-admin yarn test`
- Run lint. Because of course you should.
  - `$ docker-compose run --rm clib-cms-admin yarn lint`
  - `$ docker-compose run --rm clib-cms-admin yarn lint-fix`
NOTE: Running `lint-fix` will auto fix your ugly code. See https://prettier.io/playground/

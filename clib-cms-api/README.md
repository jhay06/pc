# CLIB-CMS-API

### Prerequisites

- [MongoDB](https://www.mongodb.org/) - 7.1.2
- [Ruby](https://www.ruby-lang.org/en/) - 2.7.1
- [Rails](http://rubyonrails.org/) - 6.0.3.2
- [Docker](https://docs.docker.com/docker-for-mac/install/) - 19.03.12 version
- [Docker-Compose](https://docs.docker.com/compose/install/) - 1.26.2 version

### Setup

0. `$ docker-compose run --rm clib-cms-api /bin/sh -c "bundle config set clean 'true' && bundle config set without 'production staging'"` to set bundle gem clean as default and without installing production & staging specific gems
1. `$ docker-compose run --rm clib-cms-api bundle install --jobs=8 --retry=2` to install gems
2. `docker-compose up --build` to launch app together with other services i.e. DB, worker servers
3. `docker-compose run --rm clib-cms-api bundle exec rake admin:create EMAIL=admin@clib.com USERNAME=admin PASSWORD=password` to create admin user
4. Run the following rake tasks

```
$ docker-compose run --rm clib-cms-api bundle exec rake db:seed
```

5. hit up localhost:3000

### Useful Commands

- run rails console
  - `$ docker-compose run --rm clib-cms-api bundle exec rails console`
- when adding new gems
  - `$ docker-compose run --rm clib-cms-api bundle install --jobs=8 --retry=2`
- when updating gems
  - `$ docker-compose run --rm clib-cms-api bundle update <GEM_NAME>`
- run a rake task
  - `$ docker-compose run --rm clib-cms-api bundle exec rake <NAMESPACE>:<TASK_NAME>`
- tunnel into container
  - `$ docker-compose exec --rm clib-cms-api /bin/sh`
- run graphql:schema:dump
  - `$ docker-compose run --rm clib-cms-api bundle exec rake graphql:schema:dump`
- run test
  - `$ docker-compose run --rm clib-cms-api bundle exec rspec spec`
- run ruby linter
  - `$ docker-compose run --rm clib-cms-api bundle exec rubocop`
  - `$ docker-compose run --rm clib-cms-api bundle exec rubocop --auto-correct-all`
- run rake task to create user-admin
  - `$ docker-compose run --rm clib-cms-api bundle exec rake admin:create EMAIL=admin@clib.com USERNAME=admin PASSWORD=password`
- run rake task to cleanup
  - `$ docker-compose run --rm clib-cms-api bundle exec rake admin:cleanup`

### GraphQL Schema Update

**IMPORTANT:** Run this rake task whenever there are changes in schema

```
$ docker-compose run --rm clib-cms-api bundle exec rake graphql:schema:dump
```

Check in changes.

## API

- See documentation in http://localhost:3000/graphiql
- See `app/graphql/schema.graphql`

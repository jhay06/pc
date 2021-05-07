FROM ruby:2.7.1-alpine3.12

RUN mkdir /clib-cms-api
WORKDIR /clib-cms-api

RUN apk add --update --no-cache \
  build-base \
  linux-headers \
  git \
  tzdata \
  openssh-client \
  less

EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]

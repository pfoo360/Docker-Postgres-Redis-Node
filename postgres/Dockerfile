FROM postgres:16rc1-alpine3.18

EXPOSE 5432

COPY db.sql /docker-entrypoint-initdb.d/

COPY secrets/ /run/secrets/

# Docker-Postgres-Redis-Node

# About

Node server that allows clients to save users info in a Postgres DB. A write-through caching pattern is used so that upon update of the primary DB the data is also added in the (Redis) cache. Queries can be done on the DB based on user ids, username or emails. A cache-aside (lazy loading) pattern is used so that the server checks the cache first before checking the DB (and any data found in a DB lookup is added to the cache). The Node server, Postgres DB, and Redis cache all live on separate containers but still are able to communicate with one another. This was mostly a small project to learn and experiment with Redis and Docker.

# Features

- Docker
- Redis
- Write-through and cache-aside caching patterns
- Postgres
- Node Express server

# Note

The cache uses sql queries as keys. This can result in stale data being sent back to the client on occasions. Additionally, secrets (Docker Swarm or Kubernetes) would be the ideal way for storing DB/cache URLs, but were beyond the scope of this exercise.

# To Do

- Docker compose file
- Save and store env variables in containers
- Add TTL to Redis items
- Add walkthrough to README

# References

- [AWS Whitepaper on caches](https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/welcome.html)

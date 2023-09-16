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

- The cache uses sql queries as keys. This can result in stale data being sent back to the client on occasions.
- Secrets (Docker Swarm or Kubernetes) would be the ideal way for storing DB/cache URLs and passwords, but were beyond the scope of this exercise. Instead, secret .txt files are manually copied over to /run/secrets/ directory to simulate the process of consuming secrets.
- Bind or volume mounts could have been created to persist DB/cache data but I chose not to since this is a test project.
- For dev purposes I could have created a volume mount with the 'node' folder so code could have been updated inside the 'server' container without having to rebuild the image (would also need to update Dockerfile with a new stage that allows hot-reloading). This project was small enough where that was unnecessary but is something to consider on larger projects.

# To Do

- Add TTL to Redis items
- Add walkthrough to README

# References

- [AWS Whitepaper on caches](https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/welcome.html)

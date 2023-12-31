CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  username VARCHAR(30) NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password VARCHAR(30) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  session_token TEXT
);
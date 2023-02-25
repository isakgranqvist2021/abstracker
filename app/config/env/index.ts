import 'dotenv/config';

const env = {
  NODE_ENV: process.env.NODE_ENV as string,
  MONGO_DB_DATABASE_URL: process.env.MONGO_DB_DATABASE_URL as string,
  AUTH0_SECRET: process.env.AUTH0_SECRET as string,
  AUTH0_BASE_URL: process.env.AUTH0_BASE_URL as string,
  AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL as string,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID as string,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET as string,
};

const errors = [];

for (const k in env) {
  if (!env[k as keyof typeof env]) {
    errors.push(`Missing env variable: ${k}\n`);
  }
}

if (errors.length) {
  throw new Error('\n' + errors.join(''));
}

export const NODE_ENV = env.NODE_ENV;
export const MONGO_DB_DATABASE_URL = env.MONGO_DB_DATABASE_URL;

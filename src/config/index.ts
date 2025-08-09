import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const throwIfUndefined = (value: string | undefined, name: string): string => {
  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
};

export default {
  port: parseInt(process.env.PORT || '5000', 10),
  database_url: throwIfUndefined(process.env.DATABASE_URL, 'DATABASE_URL'),
  bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10),
  jwt_access_secret: throwIfUndefined(process.env.JWT_ACCESS_SECRET, 'JWT_ACCESS_SECRET'),
  jwt_refresh_secret: throwIfUndefined(process.env.JWT_REFRESH_SECRET, 'JWT_REFRESH_SECRET'),
  jwt_access_expires_in: throwIfUndefined(process.env.JWT_ACCESS_EXPIRES_IN, 'JWT_ACCESS_EXPIRES_IN'),
  jwt_refresh_expires_in: throwIfUndefined(process.env.JWT_REFRESH_EXPIRES_IN, 'JWT_REFRESH_EXPIRES_IN'),
};
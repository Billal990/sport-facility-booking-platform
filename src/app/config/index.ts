import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET,
  jwt_access_expire_time:process.env.JWT_ACCESS_EXPIRE_TIME
};

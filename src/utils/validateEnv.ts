import { cleanEnv, port, str } from 'envalid';

export const validateEnv = () => {
   cleanEnv(process.env, {
      NODE_ENV: str(),
      PORT: port(),

      POSTGRES_HOST: str(),
      POSTGRES_PORT: port(),
      POSTGRES_USER: str(),
      POSTGRES_PASSWORD: str(),
      POSTGRES_DB: str(),
   });
};

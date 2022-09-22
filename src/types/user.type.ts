import { Article } from './article.type';

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  articles: Article[];
}




declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      BASE_URL: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      ACCESS_TOKEN_LIFE: string;
      REFRESH_TOKEN_LIFE: string;
      USER: string;
      PASS: string;
      SERVICE: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      REDIRECT_URI: string;
      REFRESH_TOKEN: string;
      ORIGIN_URL: string;
      AUTH_TOKEN: string;
    }
  }
}

export { User };

// Fix type definitions for environment variables

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string | undefined;
    [key: string]: any;
  }
}

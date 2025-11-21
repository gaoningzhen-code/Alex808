// Removed invalid reference to vite/client
// Explicitly declare process.env for API_KEY usage in the application

declare var process: {
  env: {
    API_KEY: string;
    [key: string]: any;
  }
};

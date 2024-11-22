export const ENV_CONFIG = {
  APP: {
    URL: process.env.NEXT_PUBLIC_APP_URL,
    ENV: process.env.NODE_ENV,
    IS_PRODUCTION: process.env.NODE_ENV === "production",
  },
  SERVICES: {
    USER_API_URL: process.env.NEXT_PUBLIC_USER_SERVICE_BASE_URL,
  },
} as const;

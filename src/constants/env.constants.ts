export const ENV_CONFIG = {
  APP: {
    URL: process.env.NEXT_PUBLIC_APP_URL,
    ENV: process.env.NODE_ENV,
    IS_PRODUCTION: process.env.NODE_ENV === "production",
  },
  SERVICES: {
    USER_API_URL: process.env.NEXT_PUBLIC_USER_SERVICE_BASE_URL,
    ACS_API_URL: process.env.NEXT_PUBLIC_ACS_API_URL || "",
  },
} as const;

export type EnvServiceApiUrl = keyof typeof ENV_CONFIG.SERVICES;

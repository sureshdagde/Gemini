export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
  },
});
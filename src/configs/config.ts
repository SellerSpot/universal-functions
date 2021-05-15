export const CONFIG = {
    APP_NAME: process.env.APP_NAME,
    ENV: process.env.ENV, // development / production
    DOMAIN: process.env.DOMAIN,
    /**
     * App secret
     */
    APP_SECRET: process.env.APP_SECRET,
    /**
     * expressed in seconds 2days (172800)
     */
    JWT_EXPIRE_TIME: 172800,
};

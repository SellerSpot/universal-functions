export const CONFIG = {
    // functional constants will be populated from the host server
    APP_NAME: (): string => process.env.APP_NAME,
    ENV: (): string => process.env.ENV, // development / production
    DOMAIN: (): string => process.env.DOMAIN,
    APP_SECRET: (): string => process.env.APP_SECRET,
    // static constants goes here
    /**
     * expressed in seconds 2days (172800)
     */
    JWT_EXPIRE_TIME: 172800,
};

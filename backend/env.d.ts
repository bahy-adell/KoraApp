declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: any;
    readonly DB: string;
    readonly BASE_URL: string;
    readonly APP_NAME: string;
    readonly NODE_ENV: string;
    readonly JWT_SECRET_KEY: string;
    readonly JWT_EXPIRED_TIME: string;  
    readonly EMAIL_USERNAME: string;
    readonly EMAIL_PASSWORD: string;
    readonly EMAIL_HOST: string;
    readonly EMAIL_PORT: string;
    readonly CLOUDINARY_CLOUD_NAME: string;
    readonly CLOUDINARY_API_KEY: string;
    readonly CLOUDINARY_API_SECRET: string;
  }
}
export default {
    PORT: process.env.PORT || 3000,
    CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
};

export default (message_en, message_ar, code) => {
    return {
        error: {
            status: "error",
            message: {
                en: message_en,
                ar: message_ar ? message_ar : message_en,
            },
            code: code ? code : 400,
            statusMessage: "APP_VALIDATION_ERROR",
        },
    };
};

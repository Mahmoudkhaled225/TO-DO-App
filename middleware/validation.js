// core function validation

export const validation = (schema) => {
    return (req, res, next) => {
        const requestKeys = ["body","user", "params", "query", "headers", "file", "files"];
        let validationErrorArr = [];
        for (const key of requestKeys) {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], {
                    abortEarly: false,
                });
                if (validationResult?.error?.details) {
                    validationErrorArr.push(validationResult.error.details);
                }
            }
        }
        if (validationErrorArr.length) {
            return res.json({
                validation_Erorr: "Validation Error",
                Errors: validationErrorArr,
            });
        }
        return next();
    };
};

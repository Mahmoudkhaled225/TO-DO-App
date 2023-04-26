import Joi from "joi";

export const signUpValidatinon = {
    body: Joi.object().required().keys({
            name: Joi.string().min(1).max(100).alphanum().messages({
                "string.min": "name must contain at least 1 and up to 100 charachters",
            }),
            email: Joi.string()
                .email({ tlds: { allow: ["com", "net"] }, minDomainSegments: 10 })
                .required()
                .messages({
                    "string.email": "Email format in-valid",
                    "any.required": "please enter your email",
                }),
            password: Joi.string().required().min(1).max(20).messages({
                "string.min": "password must contain at least 1 and at most 20 charachters",
            }),
            confirmtionPassword: Joi.string().valid(Joi.ref("password")).messages({
                "any.only": "confirmation password must match password",
            }),
            age: Joi.number().required(),
        })
};

export const logInValidation = {
    body: Joi.object()
        .required()
        .keys({
            email: Joi.string()
                .email({ tlds: { allow: ["com", "net"] }, minDomainSegments: 2 })
                .required()
                .messages({
                    "string.email": "Email format in-valid",
                    "any.required": "please enter your email",
                }),
            password: Joi.string().required().min(1).max(100).messages({
                "string.min": "password must contain least 1 and at most 20 charachters",
            }),
        })
};

export const updateNameAndEmailValidation = {
    body: Joi.object()
        .required()
        .keys({
            name: Joi.string().min(1).max(100).alphanum().messages({
                "string.min": "name must contain at least 1 and up to 100 charachters",
            }),
            email: Joi.string()
                .email({ tlds: { allow: ["com", "net"] }, minDomainSegments: 10 })
                .required()
                .messages({
                    "string.email": "Email format in-valid",
                    "any.required": "please enter your email",
                }),
        }),
    headers: Joi.object({
        token: Joi.required()
    }).required(),

};






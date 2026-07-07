import Joi from "joi";

const name = Joi.string().trim().min(2).max(80).required();
const email = Joi.string().trim().lowercase().email().max(254).required();
const password = Joi.string().min(8).max(128).required();

const formatValidationError = (error) => (error ? error.details?.[0]?.message || "Invalid request payload" : null);

export const validateRegisterPayload = (payload) => {
    const schema = Joi.object({
        name,
        email,
        password,
    });

    const { error, value } = schema.validate(payload, { abortEarly: true, stripUnknown: true });

    return {
        error: formatValidationError(error),
        value,
    };
};

export const validateLoginPayload = (payload) => {
    const schema = Joi.object({
        email,
        password,
    });

    const { error, value } = schema.validate(payload, { abortEarly: true, stripUnknown: true });

    return {
        error: formatValidationError(error),
        value,
    };
};

export const validateGoogleAuthPayload = (payload) => {
    const schema = Joi.object({
        name,
        email,
    });

    const { error, value } = schema.validate(payload, { abortEarly: true, stripUnknown: true });

    return {
        error: formatValidationError(error),
        value,
    };
};

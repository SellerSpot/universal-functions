import joi from 'joi';

export const commonSchema = {
    objectId: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
};

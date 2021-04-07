import joi from 'joi';

export const createTenant = joi.object({
    email: joi.string().email().required(),
    name: joi.string().min(1).max(150).required(),
    password: joi.string().min(5).required(),
    storeName: joi.string().min(1).max(150).required(),
    domainName: joi.string().domain(),
});

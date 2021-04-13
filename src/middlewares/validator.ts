import { AnySchema, ValidationError, isError, isSchema } from 'joi';
import { RequestHandler } from 'express';
import { logger } from '../utilities';
import { RequestValidationError, BadRequestError } from '../errors';
import { ERROR_CODE } from '@sellerspot/universal-types';

export const validateSchema = (resourceSchema: AnySchema): RequestHandler => async (
    req,
    _,
    next,
): Promise<void> => {
    const resource = req.body;
    try {
        if (isSchema(resourceSchema)) await resourceSchema.validateAsync(resource);
        next();
    } catch (e) {
        logger.error(`Error in schema validation ${e}`);
        if (isError(e)) {
            const validationError = <ValidationError>e;
            throw new RequestValidationError(validationError.details);
        }
        throw new BadRequestError(ERROR_CODE.VALIDATION_ERROR);
    }
};

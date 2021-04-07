import { AnySchema, ValidationError, isError, isSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utilities';
import { RequestValidationError, BadRequestError } from '../errors';
import { ERROR_CODE } from '@sellerspot/universal-types';

export const validateSchema = (resourceSchema: AnySchema) => async (
    req: Request,
    _: Response,
    next: NextFunction,
): Promise<void> => {
    const resource = req.body;
    try {
        if (isSchema(resourceSchema)) await resourceSchema.validateAsync(resource);
        next();
    } catch (e) {
        logger.error(`Error in schema validation ${e}`);
        if (isError(e)) {
            const validationError = e as ValidationError;
            throw new RequestValidationError(validationError.details);
        }
        throw new BadRequestError(ERROR_CODE.VALIDATION_ERROR);
    }
};

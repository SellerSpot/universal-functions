import { ERROR_CODE } from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { AnySchema, isError, isSchema, ValidationError } from 'joi';
import { BadRequestError, RequestValidationError } from '../errors';
import { logger } from '../utilities';

/**
 *
 * @param bodySchema Schema for body
 * @param headerSchema Schema for header
 * @param queryParamSchema Schema for queryparam
 * @param pathParamSchema Schema for pathparam
 * @throws validation error if any
 */
export const validateSchema = (
    bodySchema?: AnySchema,
    headerSchema?: AnySchema,
    queryParamSchema?: AnySchema,
    pathParamSchema?: AnySchema,
): RequestHandler => async (req, _, next): Promise<void> => {
    const body = req.body;
    const header = req.headers;
    const queryParam = req.query;
    const pathParam = req.params;
    try {
        if (isSchema(bodySchema)) await bodySchema.validateAsync(body);
        if (isSchema(headerSchema)) await headerSchema.validateAsync(header);
        if (isSchema(queryParamSchema)) await headerSchema.validateAsync(queryParam);
        if (isSchema(pathParamSchema)) await headerSchema.validateAsync(pathParam);
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

import { ERROR_CODE } from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { AnySchema, isError, isSchema, ValidationError } from 'joi';
import { BadRequestError, RequestValidationError } from '../errors';
import { logger } from '../utilities';

export interface IValidateSchemaProps {
    bodySchema?: AnySchema;
    headerSchema?: AnySchema;
    queryParamSchema?: AnySchema;
    pathParamSchema?: AnySchema;
}

/**
 *  validates the request with passed in schemas
 *
 * @param {IValidateSchemaProps} props - validation schemas
 *
 * @throws validation error if any
 */
export const validateSchema =
    (props: IValidateSchemaProps): RequestHandler =>
    async (req, _, next): Promise<void> => {
        const { bodySchema, headerSchema, pathParamSchema, queryParamSchema } = props;
        const body = req.body;
        const header = req.headers;
        const queryParam = req.query;
        const pathParam = req.params;
        try {
            if (isSchema(bodySchema)) await bodySchema.validateAsync(body);
            if (isSchema(headerSchema)) await headerSchema.validateAsync(header);
            if (isSchema(queryParamSchema)) await queryParamSchema.validateAsync(queryParam);
            if (isSchema(pathParamSchema)) await pathParamSchema.validateAsync(pathParam);
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

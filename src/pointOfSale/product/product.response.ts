import { tenantDbModels } from '@sellerspot/database-models';
import { IResponse } from '../../utilities';

/**
 * * Field names for textFields involved in this API used to send field based errors
 */
export type fieldNames =
    | 'name'
    | 'category'
    | 'product'
    | 'gtinNumber'
    | 'mrpPrice'
    | 'landingPrice'
    | 'sellingPrice'
    | 'availableStock'
    | 'stockUnit'
    | 'profitPercent'
    | 'taxBracket';

/**
 * Response when all products are fetched from server
 */
export type IGetProducts = IResponse & {
    data?: tenantDbModels.pointOfSaleModels.ProductModel.IProductSchema[];
    error?: string;
};

/**
 * Response when product is fetched from server
 */
export type IGetProduct = IResponse & {
    data?: tenantDbModels.pointOfSaleModels.ProductModel.IProductSchema;
    error?: string;
};

/**
 * Response when a new product is created
 */
export type ICreateProduct = IResponse & {
    data?: tenantDbModels.pointOfSaleModels.ProductModel.IProductSchema;
    error?: {
        name: fieldNames;
        message: string;
    }[];
};

/**
 * Respose when a product is updated
 */
export type IUpdateProduct = IResponse & {
    data?: tenantDbModels.pointOfSaleModels.ProductModel.IProductSchema;
    error?: {
        name: fieldNames;
        message: string;
    }[];
};

/**
 * Response when a product is deleted
 */
export type IDeleteProduct = IResponse & {
    data?: tenantDbModels.pointOfSaleModels.ProductModel.IProductSchema;
    error?: string;
};

/**
 * Respose for when a product is searched for
 */
export type ISearchProduct = IResponse & {
    data?: {
        queryType: 'name' | 'barcode';
        results: tenantDbModels.pointOfSaleModels.ProductModel.IProductSchema[];
    };
    error?: string;
};

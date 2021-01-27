import { tenantDbModels } from '@sellerspot/database-models';
/**
 * Request to get a single stockUnit from server
 */
export interface IGetSingleStockUnit {
    id: string;
}

/**
 * Request to create new stockUnit
 */
export type ICreateStockUnit = Omit<
    tenantDbModels.pointOfSaleModels.StockUnitModel.IStockUnitSchema,
    '_id' | 'createdAt' | 'updatedAt' | '__v'
>;

/**
 * Request to update a stockUnit data
 */
export interface IUpdateStockUnit {
    id: string;
    stockUnitData: ICreateStockUnit;
}

/**
 * Request to delete a stockUnit
 */
export interface IDeleteStockUnit {
    id: string;
}
import { Product } from "../entities/product";

export interface IProductRepository {
    save(product: Product): Promise<void>;
    findAll(): Promise<Product[]>;
}
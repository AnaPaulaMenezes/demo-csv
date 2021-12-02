
import { User } from "../../entities/user";
import { IUsersRepository } from "../IUsersRepository";
import { client } from "../../database/client";
import { IProductRepository } from "../IProductRepository";
import { Product } from "../../entities/product";

export class PostgresProductRepository implements IProductRepository {
    async findAll(): Promise<Product[]> {
        return await client.products.findMany();

    }

    async save(product: Product): Promise<void> {
        const { code_bar, description, price, quantity } = product

        await client.products.create({
            data: {
                code_bar,
                description,
                quantity,
                price
            }
        })

    }

}
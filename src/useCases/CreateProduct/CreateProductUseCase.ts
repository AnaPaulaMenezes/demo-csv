import { Readable } from 'nodemailer/lib/xoauth2';
import { IProductRepository } from '../../repositories/IProductRepository';
import readline from "readline";
import { Product } from '../../entities/product';

export class CreateProductUseCase {
    constructor(
        private productsRepository: IProductRepository,

    ) {
    }

    async execute(file: Express.Multer.File) {
        const { buffer } = file;
        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const productsLine = readline.createInterface({
            input: readableFile
        });

        const products: Product[] = [];
        let count = 0;
        for await (let line of productsLine) {
            const productLineSplit = line.split(";");
            if (count > 0) {
                const data = {
                    code_bar: productLineSplit[0],
                    description: productLineSplit[1],
                    price: Number(productLineSplit[2]),
                    quantity: Number(productLineSplit[3])
                }

                const newProduct = new Product(data);
                products.push(newProduct);
            }
            count++
        }


        for await (const product of products) {
            await this.productsRepository.save(product);
        }


    }
}
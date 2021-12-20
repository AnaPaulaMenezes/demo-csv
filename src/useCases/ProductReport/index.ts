import { PostgresProductRepository } from "../../repositories/implementations/PostgresProductRepository";
import { ProductReportController } from "./productsReportController";
import { ProductReportUseCase } from "./ProductsReportUseCase";

const postgresProductRepository = new PostgresProductRepository();

const productsReportUseCase = new ProductReportUseCase(
    postgresProductRepository
)

const productsReportController = new ProductReportController(productsReportUseCase);

export { productsReportUseCase, productsReportController }
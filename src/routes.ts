import { Router, Request, Response } from "express";
import multer from "multer";
import { createUserController } from "./useCases/CreateUser";
import { createProductController } from "./useCases/CreateProduct";
import bodyParser from 'body-parser';
import { client } from "./database/client";
import { productsReportController } from "./useCases/ProductReport";

const multerConfig = multer()
const router = Router();
const jsonParser = bodyParser.json();

router.post("/user", jsonParser, async (request: Request, response: Response) => {
    return await createUserController.handle(request, response)
});

router.post("/products", multerConfig.single("file"), async (request: Request, response: Response) => {
    return await createProductController.handle(request, response);
});

router.get("/products", async (request: Request, response: Response) => {
    const products = await client.products.findMany();
    return response.json(products)
});

router.get("/productsReport", async (request: Request, response: Response) => {
    return productsReportController.handle(request, response)
});


export { router };
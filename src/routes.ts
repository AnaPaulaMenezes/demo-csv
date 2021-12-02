import { Router, Request, Response } from "express";
import multer from "multer";
import { createUserController } from "./useCases/CreateUser";
import { createProductController } from "./useCases/CreateProduct";
import bodyParser from 'body-parser';

const multerConfig = multer()
const router = Router();
const jsonParser = bodyParser.json();

router.post("/user", jsonParser, async (request: Request, response: Response) => {
    return await createUserController.handle(request, response)
});

router.post("/products", multerConfig.single("file"), async (request: Request, response: Response) => {
    return await createProductController.handle(request, response);
});


export { router };
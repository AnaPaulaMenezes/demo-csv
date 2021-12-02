import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
    constructor(
        private createProductUseCase: CreateProductUseCase
    ) {
    }
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { file } = request;
            if (!file) {
                throw new Error("File not found")
            }
            await this.createProductUseCase.execute(file);
            return response.status(200).send()
        } catch (err) {
            if (err instanceof Error) {
                return response.status(400).json({
                    message: err.message.toString() || "unexpected error"
                })
            }
            return response.status(400)

        }
    }
}
import { ProductReportUseCase } from "./ProductsReportUseCase";
import { Request, Response } from "express";
export class ProductReportController {
    constructor(
        private productReportUseCase: ProductReportUseCase
    ) {
    }
    async handle(request: Request, response: Response): Promise<any> {
        try {

            const pdfDoc = await this.productReportUseCase.execute();
            const chunks: any[] = [];

            pdfDoc.on("data", (chunk) => {
                chunks.push(chunk)
            })
            pdfDoc.end();


            pdfDoc.on("end", () => {
                const res = Buffer.concat(chunks)
                return response.end(res)
            })

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
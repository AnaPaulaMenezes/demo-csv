import { IProductRepository } from "../../repositories/IProductRepository";
import PdfPrinter from "pdfmake";
import { TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
export class ProductReportUseCase {
    constructor(
        private productsRepository: IProductRepository,

    ) {
    }

    async execute() {
        const products = await this.productsRepository.findAll();
        const fonts = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            }
        };

        const printer = new PdfPrinter(fonts);
        const body = [];

        const columnsTitle: TableCell[] = [
            { text: "ID", style: "columnsTitle" },
            { text: "Description", style: "columnsTitle" },
            { text: "Price", style: "columnsTitle" },
            { text: "Quantity", style: "columnsTitle" }
        ]

        const columnsBody = new Array();
        columnsTitle.forEach(column => columnsBody.push(column))
        body.push(columnsBody);

        for await (let product of products) {
            const rows = new Array();
            rows.push(product.id);
            rows.push(product.description);
            rows.push(`R$ ${product.price}`);
            rows.push(product.quantity);

            body.push(rows);
        }

        const docDefinition: TDocumentDefinitions = {
            content: [
                {
                    columns: [
                        { text: "Products Report", style: "header" },
                        { text: "2021/12/08 \n \n", style: "header" }
                    ]

                },
                {
                    table: {
                        heights: function (row) {
                            return 20;
                        },
                        widths: [250, 'auto', 100, 'auto'],
                        body
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: "center",

                },
                columnsTitle: {
                    fontSize: 13,
                    bold: true,
                    fillColor: "#71522A",
                    margin: 2,

                }
            },
            defaultStyle: { font: 'Helvetica' }
        };


        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        return pdfDoc;

    }
}
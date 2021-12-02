import { v4 } from "uuid";

export class Product {
    public readonly id: string = "";

    public code_bar: string;
    public description: string
    public price: number;
    public quantity: number;

    constructor(props: Omit<Product, 'id'>, id?: string) {

        this.code_bar = props.code_bar
        this.description = props.description
        this.price = props.price
        this.quantity = props.quantity

        if (!id) {
            this.id = v4();
        }
    }
}
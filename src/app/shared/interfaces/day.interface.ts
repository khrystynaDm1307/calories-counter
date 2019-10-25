export interface IProduct {
    name: string;
    calories: number;
}
export interface IMeal {
    product: IProduct;
    weight: number;
}
export interface IDay {
    id: number;
    breakfast: Array<IMeal>;
    lunch: Array<IMeal>;
    dinner: Array<IMeal>;
    counter: number;
}

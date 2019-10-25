import { IDay, IMeal, IProduct } from '../interfaces/day.interface';

export class Day implements IDay {
    constructor(
        public id: number,
        public breakfast: Array<IMeal>,
        public lunch: Array<IMeal>,
        public dinner: Array<IMeal>,
        public counter: number
    ) { }
}

export class Product implements IProduct {
    constructor(
        public name: string,
        public calories:number
    ) { }
}

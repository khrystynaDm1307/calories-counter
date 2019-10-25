import { ICategory } from './category.interface';

export interface IPost {
    id: number;
    category: ICategory;
    title: string;
    text: string;
    image: string;
    coments: Array<IComent>;
}

export interface IComent {
    id: number;
    user: string;
    time: string;
    comentText: string;
}
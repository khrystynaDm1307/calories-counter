import { IPost, IComent } from '../interfaces/post.interface';
import { ICategory } from '../interfaces/category.interface';

export class Post implements IPost {
    constructor(
        public id: number,
        public category: ICategory,
        public title: string,
        public text: string,
        public image: string,
        public coments: Array<IComent>
    ) { }
}

export class Coment implements IComent {
    constructor(
        public id: number,
        public user: string,
        public time: string,
        public comentText: string,
    ) { }
}

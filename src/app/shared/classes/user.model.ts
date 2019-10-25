import { IUser } from '../interfaces/user.interface';
import { IDay } from '../interfaces/day.interface';
import { IUserFb } from '../interfaces/userFb.interface';

export class UserFb implements IUserFb {
    constructor(
        public uid: string,
        public email: string,
        public displayName: string,
        public photoURL: string,
        public emailVerified: boolean,
        public sex: string,
        public height: number,
        public weightStart: number,
        public weightGoal: number,
        public activity: number,
        public days: Array<IDay>,
        public url: string
    ) { }
}

export class User implements IUser {
    constructor(
        public uid: string,
        public email: string,
        public displayName: string,
        public photoURL: string,
        public emailVerified: boolean,
    ) { }
}


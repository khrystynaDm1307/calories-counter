import { IDay } from './day.interface';
export interface IUserFb {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    sex: string;
    height: number;
    weightStart: number;
    weightGoal: number;
    activity: number;
    days: Array<IDay>;
    url: string;
}

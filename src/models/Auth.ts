import {User} from "./User.ts";

export type AuthModel = {
    data: User;
    token: string;
}
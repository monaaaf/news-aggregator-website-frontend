import {Response} from './General.ts'
import {Author, Category, Source} from "./Misc.ts";

export type User = {
    id: number,
    name: string,
    password?: string,
    password_confirmation?: string,
    email: string,
    categories: Category[],
    sources: Source[],
    authors: Author[],
}

export type UserPaginate = Response<User[]>;

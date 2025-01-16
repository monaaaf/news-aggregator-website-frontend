import {Author, Category, Source} from "./Misc.ts";
import {Response} from './General.ts'

export type Options = {
    categories: Category[],
    sources: Source[],
    authors: Author[],
}

export type OptionsPaginate = Response<Options[]>

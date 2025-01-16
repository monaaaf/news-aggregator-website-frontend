import {Response} from './General.ts'
import {ArticleCondensed} from "./Article.ts";

export type Category = {
    id: number,
    name: string,
    slug: string,
    articles: ArticleCondensed[]
}

export type CategoryPaginate = Response<Category[]>;

export type Source = {
    id: number,
    name: string,
    url: string,
}

export type SourcePaginate = Response<Source[]>;

export type Author = {
    id: number,
    name: string,
    email: string,
}

export type AuthorPaginate = Response<Author[]>;


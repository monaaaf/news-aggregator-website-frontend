import {Response} from './General.ts'
import {Author, Category, Source} from "./Misc.ts";

export type Article = {
    id: number,
    title: string,
    trail_text: string,
    stand_first: string,
    main: string,
    content: string,
    url: string,
    featured_image: string,
    published_at: string,
    source: Source,
    category: Category,
    author: Author,
}

export type ArticleCondensed = {
    id: number,
    title: string,
    featured_image: string,
    published_at: string,
    author: Author,
}

export type ArticlePaginate = Response<Article[]>;

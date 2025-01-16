import {ReactNode} from "react";

export type PaginationState = {
    page: number
    per_page: 10 | 30 | 50 | 100
    links?: Array<{ label: string; active: boolean; url: string | null; page: number | null }>
    total: number
    current_page: number
    last_page: number
}

export type Response<T> = {
    data?: T

    meta?: PaginationState

    payload?: {
        message?: string
        errors?: {
            [key: string]: Array<string>
        }
        pagination?: PaginationState
    }
}

export type WithChildren = {
    children?: ReactNode;
}

export const defaultPaginationState: PaginationState = {
    page: 1,
    per_page: 10,
    total: 0,
    current_page: 1,
    last_page: 0,
    links: []
}
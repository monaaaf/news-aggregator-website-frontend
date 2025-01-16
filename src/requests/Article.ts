import axios, {AxiosResponse} from 'axios'
import {ArticlePaginate} from "../models/Article.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}`

export const getArticles = async (query?: string) => {
    let url = `${ENDPOINT}/articles`

    if (query) {
        url += `?${query}`;
    }

    return axios
        .get(url)
        .then((response: AxiosResponse<ArticlePaginate>) => response.data)
        .catch((error) => {
            return error
        })
}

export const getArticle = async (id: number)=> {
    const url = `${ENDPOINT}/articles/${id}`

    return axios
        .get(url)
        .then((response) => response.data.data)
        .catch((error) => {
            return error
        })
}
import axios, {AxiosResponse} from 'axios'
import {AuthorPaginate} from "../models/Misc.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}`

export const getTopAuthors = async () => {
    const url = `${ENDPOINT}/authors/top`

    return axios
        .get(url)
        .then((response: AxiosResponse<AuthorPaginate>) => response.data)
        .catch((error) => {
            return error
        })
}
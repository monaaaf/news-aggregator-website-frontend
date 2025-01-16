import axios, {AxiosResponse} from 'axios'
import {CategoryPaginate} from "../models/Misc.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}`

export const getTopCategories = async () => {
    const url = `${ENDPOINT}/categories/top`

    return axios
        .get(url)
        .then((response: AxiosResponse<CategoryPaginate>) => response.data)
        .catch((error) => {
            return error
        })
}
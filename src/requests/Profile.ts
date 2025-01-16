import axios, {AxiosResponse} from 'axios'
import {User} from "../models/User.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}`

export const savePreferences = async (userId: number, categories: number[], sources: number[], authors: number[]) => {
    const url = `${ENDPOINT}/users/${userId}/preferences`

    return axios
        .post(url, {category_ids: categories, source_ids: sources, author_ids: authors})
        .then((response: AxiosResponse<User>) => response.data)
        .catch((error) => {
            return error
        })
}
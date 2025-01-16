import axios, {AxiosResponse} from 'axios'
import {OptionsPaginate} from "../models/Options.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}`

export const getOptions = async () => {
    const url = `${ENDPOINT}/options`

    return axios
        .get(url)
        .then((response: AxiosResponse<OptionsPaginate>) => response.data.data)
        .catch((error) => {
            return error
        })
}
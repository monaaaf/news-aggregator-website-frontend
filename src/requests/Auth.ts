import {User} from "../models/User.ts";
import axios from "axios";
import {AuthModel} from "../models/Auth.ts";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const GET_USER_PROFILE = `${API_URL}/profile`

export function login(email: string, password: string) {
    return axios.post<AuthModel>(LOGIN_URL, {
        email,
        password,
    });
}

export function register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
) {
    return axios.post(REGISTER_URL, {
        name,
        email,
        password,
        password_confirmation,
    });
}

export function getUserByToken(token: string) {
    return axios.get<User>(GET_USER_PROFILE, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        transformResponse: [
            function (data) {
                return JSON.parse(data).data
            },
        ],
    })
}
import axios from "axios";

export const getErrorPage = (response: any) => {
    if (axios.isAxiosError(response)) {
        return '/error/404'
    } else if (response === undefined) {
        return '/error/400'
    }

    return null
}

import { API_URL } from "../contants"

export const search = async (city, query, pagination) => {
    let offset = pagination.pageIndex + 1 || 1;
    let limit = pagination.pageSize || 10;

    let response = await fetch(`${API_URL}branches/search/?format=json&city=${city}&q=${query}&limit=${limit}&offset=${offset}`)

    if(response.status === 200) {
        let data = (await response.json()).result
        return data
    }
}
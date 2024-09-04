import { Cat } from "@/types/cat";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const url_path: string = import.meta.env.VITE_BACKEND_ADDR as string;
const api = axios.create({
    baseURL: url_path,
});

interface Cache {
    [key: string]: AxiosResponse<any>;
}

// Cache object
const cache: Cache = {};

async function fetchWithCache(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
    const cacheKey: string = url;

    if (cache[cacheKey]) {
        console.log('Returning cached data for:', url);
        return Promise.resolve(cache[cacheKey]);
    }

    try {
        const response: AxiosResponse<any> = await api.get(url, config);
        cache[cacheKey] = response;
        return response;
    } catch (error) {
        console.error('Request failed for:', url, error);
        throw error;
    }
}

function clearCache(): void {
    for (let key in cache) {
        delete cache[key];
    }
}

async function fetchCats(page: number): Promise<Cat[]> {
    try {
        const response = await fetchWithCache(`/api/cat/get?page=${page}&page-size=${import.meta.env.VITE_PAGE_SIZE}`);
        const cats: Cat[] = response.data.data
        return cats
    } catch (e) {
        console.error("Failed to fetch cats:", e)
        throw e
    }
}

async function fetchCat(uuid: string): Promise<Cat> {
    try {
        const response = await fetchWithCache(`/api/cat/get_by_id?uuid=${uuid}`);
        const cat: Cat = response.data.data
        return cat
    } catch (e) {
        console.error("Failed to fetch cat:", e)
        throw e
    }
    
}

export { fetchWithCache, clearCache, fetchCats, fetchCat };
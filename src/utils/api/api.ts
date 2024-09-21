import { Reaction } from './../../types/cat';
import { Cat } from "@/types/cat";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import getFingerprint from "../common/fingerprint";

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

async function addReaction(uuid: string, reaction: string) {
    try {
        const fingerprint = await getFingerprint();
        const response = await api.get(`/api/cat/add_reaction?cat=${uuid}&reaction=${reaction}&fingerprint=${fingerprint}`);
        const error: string = response.data.error;
        if (error && error !== "") {
            throw error
        }
    } catch (e) {
        console.error("Failed to add reaction:", e)
        throw e
    } 
}

async function removeReaction(uuid: string, reaction: string) {
    try {
        const fingerprint = await getFingerprint();
        const response = await api.get(`/api/cat/remove_reaction?cat=${uuid}&reaction=${reaction}&fingerprint=${fingerprint}`);
        const error: string = response.data.error;
        if (error && error !== "") {
            throw error
        }
    } catch (e) {
        console.error("Failed to remove reaction:", e)
        throw e
    }
}

async function fetchReactions(): Promise<string[]> {
    try {
        const response = await fetchWithCache('/api/cat/valid_reactions');
        const reactions: string[] = response.data.data
        return reactions
    } catch (e) {
        console.error("Failed to fetch reactions:", e)
        throw e
    }
}

async function fetchCats(page: number): Promise<Cat[]> {
    try {
        const fingerprint = await getFingerprint();
        const response = await fetchWithCache(`/api/cat/get?page=${page}&page-size=${import.meta.env.VITE_PAGE_SIZE}&fingerprint=${fingerprint}`);
        const cats: Cat[] = response.data.data
        cats.forEach((cat: Cat) => {
            if (!cat.reactions) {
                cat.reactions = <Reaction[]>[]
            }
        })
        return cats
    } catch (e) {
        console.error("Failed to fetch cats:", e)
        throw e
    }
}

async function fetchCat(uuid: string): Promise<Cat> {
    try {
        const fingerprint = await getFingerprint();
        const response = await fetchWithCache(`/api/cat/get_by_id?uuid=${uuid}&fingerprint=${fingerprint}`);
        const cat: Cat = response.data.data
        if (!cat.reactions) {
            cat.reactions = <Reaction[]>[]
        }
        return cat
    } catch (e) {
        console.error("Failed to fetch cat:", e)
        throw e
    }
    
}

export { fetchWithCache, clearCache, fetchCats, fetchCat, fetchReactions, addReaction, removeReaction };
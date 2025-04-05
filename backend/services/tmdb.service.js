import axios from "axios";
import { TMDB_API_KEY } from "../config/env.js";

export const fetchFromTMDB = async (url) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + TMDB_API_KEY
        }
    };

    const res = await axios.get(url, options);

    if (res.status !== 200) {
        throw new Error('Failed to fetch data from TMDB' + res.statusText);
    }

    return res.data;
}
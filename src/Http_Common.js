import axios from "axios";

const API_BASE_URL = 'https://localhost:8050';

export const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});
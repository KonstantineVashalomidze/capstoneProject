import axios from "axios";

import { BASE_URL } from "../config";


const axiosInstance = axios.create({baseURL: BASE_URL});

axios.interceptors.response.use(
    (res) => res,
    (err) =>
        Promise.reject((err.resonse && err.response.data) || "Something went wrong :("));


export default axiosInstance;
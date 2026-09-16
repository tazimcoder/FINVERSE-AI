/**
 * ==========================================================
 * FINVERSE AI
 * Axios Instance
 * ==========================================================
 */

import axios from "axios";

import API_CONFIG from "../config/api.config";


const api = axios.create({

    baseURL: API_CONFIG.BASE_URL,

    timeout: API_CONFIG.TIMEOUT,

    headers: {

        "Content-Type": "application/json",

    },

});


/* ==========================================================
   Attach JWT Token To Every Request
========================================================== */

api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("token");


        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    },


    (error) => {

        return Promise.reject(error);

    }

);


export default api;
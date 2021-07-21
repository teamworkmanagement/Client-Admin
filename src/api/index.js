import { DOMAIN } from "src/env";
import axiosClient from "./axiosClient";

export const refreshTokenFunc = () => {
    return axiosClient.post("/account/refresh").then(function (response) {
        return response;
    });
}

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export const delete_cookie = (name) => {
    document.cookie = name + `=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;Domain=${DOMAIN};`;
}
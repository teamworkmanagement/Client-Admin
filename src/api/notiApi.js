import axiosClient from "./axiosClient";


const notiApi = {
    push(payload) {
        const url = `/notification/push`;
        return axiosClient.post(url, payload);
    }
};

export default notiApi;
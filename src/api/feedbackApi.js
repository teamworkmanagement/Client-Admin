import axiosClient from "./axiosClient";


const feedbackApi = {
    getFeedbacks() {
        const url = `/feedback`;
        return axiosClient.get(url);
    },
    makeSeen(payload) {
        const url = `/feedback/seen`;
        return axiosClient.post(url, payload);
    },
    remove(payload) {
        const url = `/feedback/remove`;
        return axiosClient.post(url, payload);
    }
};

export default feedbackApi;
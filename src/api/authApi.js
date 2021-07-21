import axiosClient from "./axiosClient";

const authApi = {
    login(data) {
        const url = '/account/authenticate';
        return axiosClient.post(url, data);
    },
    isLogin() {
        const url = '/account/is-login';
        return axiosClient.get(url);
    }
};

export default authApi;
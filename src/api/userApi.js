import axiosClient from "./axiosClient";
const userApi = {
    getById(userId) {
        const url = `/user/${userId}`;
        return axiosClient.get(url);
    }
};

export default userApi;
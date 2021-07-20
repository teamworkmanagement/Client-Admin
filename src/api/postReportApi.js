import axiosClient from "./axiosClient";


const postReportApi = {
    getReports(payload) {
        const url = '/post-report';
        return axiosClient.get(url);
    },
    denyPosts(payload) {
        const url = `/post-report/deny`;
        return axiosClient.post(url, payload);
    },
    acceptPosts(payload) {
        const url = `/post-report/accept`;
        return axiosClient.post(url, payload);
    },
    removeReports(payload) {
        const url = '/post-report/remove';
        return axiosClient.post(url, payload);
    }
};

export default postReportApi;
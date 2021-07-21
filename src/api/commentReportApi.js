import axiosClient from "./axiosClient";


const commentReportApi = {
    getReports(payload) {
        const url = '/comment-report';
        return axiosClient.get(url);
    },
    denyComments(payload) {
        const url = `/comment-report/deny`;
        return axiosClient.post(url, payload);
    },
    acceptComments(payload) {
        const url = `/comment-report/accept`;
        return axiosClient.post(url, payload);
    },
    removeReports(payload) {
        const url = '/comment-report/remove';
        return axiosClient.post(url, payload);
    }
};

export default commentReportApi;
import axiosClient from "./axiosClient";

const projectAPI = {
    getAllProject(){
        const getToken = localStorage.getItem('access_token')
        const url = "/Project/getAllProject"
        return axiosClient.get(url, `Bearer ${getToken}`)
    }
}

export default projectAPI
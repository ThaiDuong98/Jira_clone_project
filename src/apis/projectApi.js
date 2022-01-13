import axiosClient from "./axiosClient";

const projectAPI = {
    getAllProject(keyword){
        const url = `/Project/getAllProject?${keyword}`
        return axiosClient.get(url,keyword)
    },
    getAllCategory(){
        const url = "/ProjectCategory"
        return axiosClient.get(url)
    },
    createProject(data){
        const url = "/Project/createProjectAuthorize"
        return axiosClient.post(url, data)
    },
    deleteProjectByid(id){
        const url = `/Project/deleteProject?projectId=${id}`
        return axiosClient.delete(url)
    }, 
    updateProject(project){
        const url = `/Project/updateProject?projectId=${project.id}`                   
        return axiosClient.put(url, project)
    }
}

export default projectAPI
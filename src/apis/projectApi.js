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
    },
    getProjectDetail(id){
        const url = `/Project/getProjectDetail?id=${id}`
        return axiosClient.get(url)
    },
    getAllStatus(){
        const url = "/Status/getAll"
        return axiosClient.get(url)
    },
    getPriorities(){
        const url = "/Priority/getAll"
        return axiosClient.get(url)
    },
    getAllTaskType(){
        const url = "/TaskType/getAll"
        return axiosClient.get(url)
    },
    getAssignUsers(projectId){
      const url = `/Users/getUserByProjectId?idProject=${projectId}`
      return axiosClient.get(url)
    },
    createTask(task){
        const url = "/Project/createTask"
        return axiosClient.post(url, task)
    }
}

export default projectAPI
import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = "/Users/signin";
    return axiosClient.post(url, data);
  },
  register(data){
    const url = "/Users/signup"
    return axiosClient.post(url, data)
  },
  getUsers(keyword){
    const url = `/Users/getUser?${keyword}`
    return axiosClient.get(url, keyword)
  },
  assignUserToProject(user){
    const url = "/Project/assignUserProject"
    return axiosClient.post(url, user)
  },
  deleteUserFromProject(user){
    const url = "/Project/removeUserFromProject"
    return axiosClient.post(url, user)
  }
};

export default userApi;

import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = "Users/signin";
    return axiosClient.post(url, data);
  },
};

export default userApi;

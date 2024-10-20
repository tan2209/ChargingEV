import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://ev-charging-server-z3gr3glbrq-de.a.run.app/'
  });
  
  
axiosClient.interceptors.response.use(function (response) {
  
    return response;
  }, function (error) {
  
    return Promise.reject(error);
  });

  export default axiosClient;
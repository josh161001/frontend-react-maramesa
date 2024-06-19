import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

axios.defaults.headers.post["Accept"] = "application/vnd.api+json";
axios.defaults.headers.post["Content-Type"] = "application/vnd.api+json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Headers"] = "*";

//configurar interceptores
axiosClient.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("ACCESS_TOKEN");

  config.headers.Authorization = `Bearer ${access_token}`;

  return config;
});

export default axiosClient;

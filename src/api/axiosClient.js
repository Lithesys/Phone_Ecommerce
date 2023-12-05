import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://0.tcp.ap.ngrok.io:18596/api",
  headers: {
    "content-type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem('access_token');
    console.log('access_token_local', accessToken);
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    // }

    if (accessToken) {
      try {
        const parsedToken = JSON.parse(accessToken);
        if (parsedToken && typeof parsedToken === 'string') {
          config.headers.Authorization = `Bearer ${parsedToken}`;
        } else {
          console.error('Invalid access token format:', accessToken);
        }
      } catch (error) {
        console.error('Error parsing access token:', error);
      }
    }
    return config;
  },
  
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
// export const setHeaderConfigAxios = (access_token) => {
  
//   if(access_token) {
//     axiosClient.defaults.headers.common["Authorization"] = access_token
//       ? "Bearer " + access_token
//       : "";
//   }else {
//     delete axiosClient.defaults.headers.common["Authorization"];
//   }
// };
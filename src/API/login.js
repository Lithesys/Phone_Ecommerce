import axiosClient from "./axiosClient.js";

const LOGIN_URL = "customers/login";

function Login(data) {
  return axiosClient.post(LOGIN_URL, data);
}

export default Login;

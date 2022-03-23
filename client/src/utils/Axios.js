import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.NODE_ENV === "development" ?
    "http://localhost:5000" :
    "https://test-server1709.herokuapp.com",
});

export default Axios;
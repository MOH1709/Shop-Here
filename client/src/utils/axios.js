import axios from "axios";

const env = process.env.NODE_ENV; // current environment

export default axios.create({
  baseURL: env === "production" ?
    "https://nearme-beta.herokuapp.com/" // production
    :
    "", // development
});
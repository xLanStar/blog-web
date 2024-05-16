import axios from "axios";

const APIHelper = axios.create({
  withCredentials: true,
});

export default APIHelper;

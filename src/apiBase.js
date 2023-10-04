import Axios from "axios";

Axios.defaults.baseURL = "https://rms-yzpc.onrender.com/";

export const apiBase = Axios.create({});

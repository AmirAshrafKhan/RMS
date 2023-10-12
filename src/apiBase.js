import Axios from "axios";

Axios.defaults.baseURL = "https://rms-buzzhiring.onrender.com/";

export const apiBase = Axios.create({});

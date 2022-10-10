import axios from "axios";

export const source = axios.CancelToken.source();
export default axios.create({ baseURL: "http://192.168.1.9:8000" });

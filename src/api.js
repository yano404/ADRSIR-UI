import axios from "axios";
import { API_URL } from "./config/apiconfig";

export default axios.create({
    baseURL: API_URL
})
import axios from "axios"

export const api = axios.create({
  baseURL: "https://rocketnotes-api-ute7.onrender.com"
})
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getPosts(perPage, page) {
    return apiClient.get("/posts?_limit=" + perPage + "&_page=" + page);
  },
};

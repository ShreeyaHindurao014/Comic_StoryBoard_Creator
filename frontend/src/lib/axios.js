import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3000/api",
  baseURL: 'https://comic-storyboard-creator.onrender.com'
});

export default api;

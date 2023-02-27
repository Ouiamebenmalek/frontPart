import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:3000",
  baseURL: "https://backendpokemon-production.up.railway.app/",
  headers: {
    "Content-type": "application/json"
  }
});